(function () {
  'use strict';

  const STORAGE_HIDDEN_BOTS = 'hidden_bots';
  const STORAGE_HIDDEN_AUTHORS = 'hidden_authors';

  const getHiddenBots = () => JSON.parse(localStorage.getItem(STORAGE_HIDDEN_BOTS) || '[]');
  const saveHiddenBots = (arr) => localStorage.setItem(STORAGE_HIDDEN_BOTS, JSON.stringify(arr));

  function addMenuButtons() {
    document.querySelectorAll('a[href^="/chat/"]').forEach(card => {
      if (card.querySelector('.ux-bot-menu-btn')) return;

      const href = card.getAttribute('href');
      const idMatch = href.match(/\/chat\/([^\/?#]+)/);
      const botId = idMatch ? idMatch[1] : null;

      let author = 'unknown';
      const text = card.innerText || '';
      const authorMatch = text.match(/by\s+([^\n]+)/i);
      if (authorMatch) author = authorMatch[1].trim();

      if (!botId) return;

      const menuBtn = document.createElement('button');
      menuBtn.innerText = '⋮';
      menuBtn.title = 'Bot menu';
      menuBtn.className = 'ux-bot-menu-btn absolute top-2 right-2 text-lg z-50 bg-transparent border-none cursor-pointer text-foreground';
      menuBtn.style.userSelect = 'none';

      menuBtn.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        showBotMenu(e.pageX, e.pageY, botId, author, card);
      };

      if (window.getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
      }

      card.appendChild(menuBtn);
    });
  }

  function showBotMenu(x, y, botId, author, card) {
    const oldMenu = document.getElementById('ux-bot-menu-popup');
    if (oldMenu) oldMenu.remove();

    const menu = document.createElement('div');
    menu.id = 'ux-bot-menu-popup';
    menu.style.position = 'absolute';
    menu.style.top = y + 'px';
    menu.style.left = x + 'px';
    menu.style.background = '#202024';
    menu.style.border = '1px solid #444';
    menu.style.borderRadius = '12px'; // увеличенное скругление
    menu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
    menu.style.zIndex = 9999;
    menu.style.minWidth = '160px';
    menu.style.color = '#eee';
    menu.style.fontSize = '14px';
    menu.style.userSelect = 'none';
    menu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    menu.style.opacity = '0';
    menu.style.transform = 'scale(0.95)';
    document.body.appendChild(menu);

    // плавное появление
    requestAnimationFrame(() => {
      menu.style.opacity = '1';
      menu.style.transform = 'scale(1)';
    });

    function createMenuItem(text, onClick) {
      const item = document.createElement('div');
      item.innerText = text;
      item.style.padding = '10px';
      item.style.cursor = 'pointer';
      item.style.transition = 'background 0.2s ease, border-radius 0.2s ease';
      item.onmouseenter = () => item.style.background = '#3f3f46';
      item.onmouseleave = () => item.style.background = 'transparent';
      item.onclick = onClick;
      return item;
    }

    const hideBot = createMenuItem('Hide bot', () => {
      hideSingleBot(botId, card);
      menu.remove();
    });

    const hideAuthor = createMenuItem(`Hide all bots of the author: ${author}`, () => {
      alert(`Sorry, this feature is still very bad, I'm working on it.\n\nMade with ♡ by UXImprover`);
      menu.remove();
    });

    menu.appendChild(hideBot);
    menu.appendChild(hideAuthor);

    const clickOutside = (e) => {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', clickOutside);
      }
    };
    document.addEventListener('click', clickOutside);
  }

  function hideSingleBot(botId, card) {
    let hiddenBots = getHiddenBots();
    if (!hiddenBots.includes(botId)) {
      hiddenBots.push(botId);
      saveHiddenBots(hiddenBots);
    }
    card.style.display = 'none';
  }

  function filterHiddenCards() {
    const hiddenBots = getHiddenBots();

    document.querySelectorAll('a[href^="/chat/"]').forEach(card => {
      const href = card.getAttribute('href');
      const idMatch = href.match(/\/chat\/([^\/?#]+)/);
      const botId = idMatch ? idMatch[1] : null;

      if (botId && hiddenBots.includes(botId)) {
        card.style.display = 'none';
      } else {
        card.style.display = '';
      }
    });
  }

  function mainLoop() {
    addMenuButtons();
    filterHiddenCards();
  }

  setInterval(mainLoop, 1500);
})();
