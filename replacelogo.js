(function() {
    'use strict';

    const selectors = [
        '#__next > div > main > div > div > div > aside > div > div.overflow-hidden.transition-all.ease-out.duration-300.hidden.lg\\:block.max-w-64.translate-x-0 > div > div > div.grid.items-center.w-full.grid-cols-2.pt-6.pl-6 > a > div > svg',
        '#__next > div > main > div > div > div > aside > div > div.flex.w-screen.h-dvh > div.absolute.top-0.z-10.w-64.h-full.border-r.border-r-accent.bg-primary-foreground > div > div > div > div.grid.items-center.w-full.grid-cols-2.pt-6.pl-6 > a > div'
    ];

    function replaceLogo() {
        selectors.forEach(selector => {
            const target = document.querySelector(selector);
            if (target && !target.dataset.replaced) {
                const img = document.createElement('img');
                img.src = 'https://characterai.io/static/logo-variants/text-logo-dark.png';
                img.style.width = '100%';
                img.style.height = 'auto';
                target.replaceWith(img);
                img.dataset.replaced = "true";
            }
        });
    }

    const observer = new MutationObserver(() => {
        replaceLogo();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    replaceLogo(); 
})();