(function() {
    'use strict';

    const selectors = [
        "#__next > div > main > div > div > div > aside > div > div.overflow-hidden.transition-all.ease-out.duration-300.hidden.lg\\:block.max-w-64.translate-x-0 > div > div > div.flex.flex-col.justify-end.pb-2.px-5 > div.flex.flex-col.gap-3.py-3 > button > span > div > svg",
        "#__next > div > main > div > div > div > aside > div > div.flex.w-screen.h-dvh > div.absolute.top-0.z-10.w-64.h-full.border-r.border-r-accent.bg-primary-foreground > div > div > div > div.flex.flex-col.justify-end.pb-2.px-5 > div.flex.flex-col.gap-3.py-3 > button > span > div > svg > path"
    ];

    function replaceSVG() {
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                const container = element.closest('div');
                if (container && container.innerHTML !== `<span style="font-weight:bold; font-size:16px; color:white;">c.ai<span style="color:#1BA5FB;">+</span></span>`) {
                    container.innerHTML = `<span style="font-weight:bold; font-size:16px; color:white;">c.ai<span style="color:#1BA5FB;">+</span></span>`;
                }
            }
        }
    }

    
    replaceSVG();

    
    const observer = new MutationObserver(replaceSVG);
    observer.observe(document.body, { childList: true, subtree: true });
})();
