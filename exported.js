(function() {
  'use strict';

  window.addEventListener('load', () => {

    const copyWords = [
      'copy',          
      'копировать',    
      'copiar',        
      'copier',        
      'copiare',       
      'copiar',       
      'kopieren',      
      'kopyala',       
      'kopiuj',        
      'salin',         
      '复制',           
      '複製',          
      'コピー',         
      '복사'           
    ];

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== 1) continue;

          const copyBtn = node.querySelector('div[role="menuitem"] > button');
          if (!copyBtn) continue;

          // проверка текста кнопки на любом языке
          const btnText = copyBtn.textContent.trim().toLowerCase();
          if (!copyWords.some(word => btnText.includes(word))) continue;
          if (node.querySelector('.ux-export-btn')) continue;

          const newItem = document.createElement('div');
          newItem.setAttribute('role', 'menuitem');
          newItem.className = 'relative flex cursor-pointer select-none items-center text-sm outline-none ux-export-btn';
          newItem.tabIndex = -1;

          const btn = document.createElement('button');
          btn.className = 'z-0 group relative inline-flex items-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden px-4 h-10 text-md gap-2 rounded-md hover:bg-gray-200 justify-between w-full';
          btn.innerHTML = `
            Export chat...
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" width="18" height="18" style="margin-left: 6px;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2
                 M12 12v8m0 0l-4-4m4 4l4-4M12 4v8" />
            </svg>`;

          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const chat = getChat();
            if (chat.length === 0) return;
            openExportModal(chat);
          });

          newItem.appendChild(btn);
          const copyItem = copyBtn.closest('div[role="menuitem"]');
          copyItem.insertAdjacentElement('afterend', newItem);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const exportFormats = ['txt', 'json', 'html'];

    const openExportModal = (chat) => {
      if (document.querySelector('#export-modal-overlay')) return;

      const overlay = document.createElement('div');
      overlay.id = 'export-modal-overlay';
      overlay.style = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      const modal = document.createElement('div');
      modal.id = 'export-modal';
      modal.style = `
        background: #26272b;
        color: #fafafa;
        border-radius: 24px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        padding: 30px;
        width: 90%;
        max-width: 900px;
        max-height: 90vh;
        overflow-y: auto;
        backdrop-filter: blur(10px);
      `;

      modal.innerHTML = `
        <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">Export chat as:</h2>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          ${exportFormats.map(format => `
            <button class="export-format-button" data-format="${format}" style="
              padding: 10px 20px;
              font-size: 16px;
              background: #fafafa;
              color: #26272b;
              border: none;
              border-radius: 20px;
              cursor: pointer;
              font-weight: 500;
              display: flex;
              align-items: center;
              gap: 8px;
            ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2
                   M12 12v8m0 0l-4-4m4 4l4-4M12 4v8" />
              </svg>
              ${format.toUpperCase()} file
            </button>
          `).join('')}
        </div>
        <button id="close-export-modal" style="
          margin-top: 25px;
          font-size: 14px;
          color: #9ca3af;
          background: none;
          border: none;
          cursor: pointer;
        ">Cancel</button>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      modal.querySelectorAll('.export-format-button').forEach(btn => {
        btn.addEventListener('click', () => {
          const format = btn.getAttribute('data-format');
          exportChat(chat, format);
          closeModal();
        });
      });

      document.getElementById('close-export-modal').addEventListener('click', closeModal);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    };

    const closeModal = () => {
      const overlay = document.getElementById('export-modal-overlay');
      if (overlay) overlay.remove();
    };

    const getChat = () => {
      const chat = [];
      const chatBlocks = document.querySelectorAll('#chat-messages > div');

      chatBlocks.forEach(block => {
        const userMsg = block.querySelector('div.bg-surface-elevation-3.opacity-90');
        if (userMsg) {
          const userText = userMsg.innerText.trim();
          if (userText) chat.push({ user: 'You', text: userText });
        }

        const botMsg = block.querySelector('div.bg-surface-elevation-2.opacity-85');
        if (botMsg) {
          const botText = botMsg.innerText.trim();
          if (botText) chat.push({ user: 'Bot', text: botText });
        }
      });

      return chat;
    };

    const exportChat = (chat, format) => {
      let content = '';
      let mime = 'text/plain';
      let filename = `character_chat.${format}`;

      if (format === 'txt') {
        content = chat.map(m => `${m.user}: ${m.text}`).join('\n\n');
      } else if (format === 'json') {
        content = JSON.stringify(chat, null, 2);
        mime = 'application/json';
      } else if (format === 'html') {
        mime = 'text/html';
        content = generateStyledHTML(chat);
      }

      const blob = new Blob([content], { type: mime });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    };

    const generateStyledHTML = (chat) => {
      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Character.AI Chat Export</title>
<style>
body { margin: 0; padding: 40px; font-family: "Segoe UI", sans-serif; background: #111827; color: #f3f4f6; }
.chat-container { max-width: 800px; margin: auto; display: flex; flex-direction: column; gap: 20px; }
.message { padding: 14px 18px; border-radius: 1rem; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; backdrop-filter: blur(6px); max-width: 100%; }
.user { align-self: flex-end; background: rgba(255, 255, 255, 0.1); }
.bot { align-self: flex-start; background: rgba(255, 255, 255, 0.06); }
.sender { font-size: 13px; opacity: 0.6; margin-bottom: 6px; }
</style>
</head>
<body>
<div class="chat-container">
${chat.map(m => `
<div class="message ${m.user === "You" ? "user" : "bot"}">
<div class="sender">${m.user}</div>
${m.text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}
</div>`).join('')}
</div>
</body>
</html>`.trim();
    };

  });
})();
