(function () {
    'use strict';

    const config = [
        {
            id: "hideTopTrending",
            label: 'Hide Top and Trending',
            selectors: [
                '#main-content > div > div.max-w-7xl.self-center.w-full > div > div > div.flex.items-center.ml-6.gap-1.sm\\:gap-3 > div > div > div > div.absolute.z-50.top-full.left-0.right-0.max-h-\\[calc\\(100vh-8rem\\)\\].overflow-hidden.flex.flex-col.bg-surface-elevation-2.border-t.border-divider.rounded-b-spacing-l',
                '#main-content > div > div.hidden.lg\\:block.w-\\[300px\\].shrink-0.p-6 > div',
                'div.overflow-y-auto.rounded-spacing-l.bg-surface-elevation-2'
            ]
        },
        {
            id: "hideAvatarFX",
            label: 'Hide avatarFX',
            selectors: [
                '#__next > div > main > div > div > div > aside > div > div.overflow-hidden.transition-all.ease-out.duration-300.hidden.lg\\:block.max-w-64.translate-x-0 > div > div > div.flex.flex-col.mt-4.overflow-hidden.grow > div.w-full.px-4.pt-1 > a.tap-highlight-transparent.no-underline.hover\\:opacity-80.active\\:opacity-disabled.transition-opacity.z-0.group.relative.inline-flex.items-center.box-border.appearance-none.select-none.whitespace-nowrap.font-normal.subpixel-antialiased.overflow-hidden.tap-highlight-transparent.outline-none.data-\\[focus-visible\\=true\\]\\:z-10.data-\\[focus-visible\\=true\\]\\:outline-2.data-\\[focus-visible\\=true\\]\\:outline-focus.data-\\[focus-visible\\=true\\]\\:outline-offset-2.hover\\:bg-surface-elevation-1.px-unit-4.min-w-unit-20.h-unit-10.text-md.gap-unit-2.rounded-md.\\[\\&\\>svg\\]\\:max-w-\\[theme\\(spacing\\.unit-8\\)\\].data-\\[pressed\\=true\\]\\:scale-\\[0\\.97\\].transition-transform-colors-opacity.motion-reduce\\:transition-none.bg-ghost.text-primary.data-\\[hover\\=true\\]\\:opacity-hover.min-h-12.justify-start.mt-2.w-full.rounded-spacing-xs.group'
            ],
            hrefSelector: 'aside a[href="/video"]'
        },
        {
            id: "hideVoicesCalls",
            label: 'Hide Voices and Calls',
            selectors: [
                '#main-content > div > div.max-w-7xl.self-center.w-full > ol > div > div:nth-child(7)',
                '#chat-body > div.flex.flex-col.max-w-2xl.items-center.w-full > div > div > button',
                '#chat-details > div.flex.flex-col.gap-3.h-fit > div.flex.gap-2.items-center.rounded-spacing-xs',
                '#chat-header > div.flex.gap-2 > button',
                '[id^="radix-"]:not([id=""]):not([id$="-content"]) > div.flex.flex-col.gap-3.h-fit > div.flex.gap-2.items-center.rounded-spacing-xs',
                '#chat-messages > div:nth-child(1) > div.p-2.min-h-32 > div > div > div.swiper-slide.swiper-slide-visible.swiper-slide-fully-visible.swiper-slide-active > div > div:nth-child(1) > div.m-0.flex.flex-row.items-start.gap-2.justify-start.ml-0.md\\:ml-6 > div.flex.flex-col.gap-1.items-start.sm\\:-ml-2.w-full > div.mx-2.flex.flex-row.items-center.gap-2.font-light > div.flex.items-center > div.flex.justify-center.items-center.h-3.ml-1 > div > button',
                '#chat-messages > div:nth-child(1) > div.p-2.min-h-32 > div > div > div.swiper-slide.swiper-slide-visible.swiper-slide-fully-visible.swiper-slide-active > div > div:nth-child(1) > div.m-0.flex.flex-row.items-start.gap-2.justify-start.ml-0.md\\:ml-6 > div.flex.flex-col.gap-1.items-start.sm\\:-ml-2.w-full > div.mx-2.flex.flex-row.items-center.gap-2.font-light > div.flex.items-center > div.flex.justify-center.items-center.h-3.ml-1 > div > button'
            ]
        },
        {
            id: "hideScenes",
            label: 'Hide Scenes',
            selectors: [
                '#main-content > div > div.max-w-7xl.self-center.w-full > ol > div > div:nth-child(2)'
            ]
        },
        {
            id: "hideWhatsNew",
            label: "Hide What's New",
            selectors: [
                '#main-content > div > div.max-w-7xl.self-center.w-full > div > div > div.flex.items-center.ml-6.gap-1.sm\\:gap-3 > div.relative.flex.bg-surface-elevation-1.p-4.rounded-full.cursor-pointer.hover\\:opacity-50',
                'div[role="dialog"]#radix-\\:r4t\\:'
            ]
        }
    ];

    const REDIRECTS = [
        { path: '/video', redirectTo: '/' },
        { pathPrefix: '/scene/', redirectTo: '/' }
    ];

    const hideElements = (selectors) => {
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (el.style.display !== 'none') {
                    el.style.display = 'none';
                }
            });
        });
    };

    const applyHiding = () => {
        config.forEach(({ id, selectors, hrefSelector }) => {
            if (localStorage.getItem(id) === 'true') {
                if (selectors && selectors.length) {
                    hideElements(selectors);
                }
                if (hrefSelector) {
                    document.querySelectorAll(hrefSelector).forEach(el => {
                        if (el.style.display !== 'none') {
                            el.style.display = 'none';
                        }
                    });
                }
            }
        });
    };

    const setupPanel = () => {
        const panel = document.createElement('div');
        panel.id = 'interface-hider-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: #18181b;
            color: #ccc;
            border: 1px solid #444;
            padding: 10px;
            z-index: 99999;
            font-family: sans-serif;
            font-size: 14px;
            border-radius: 12px;
            max-width: 300px;
        `;

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = localStorage.getItem('interfaceHiderPanelCollapsed') === 'true' ? '▶' : '▼';
        toggleBtn.title = 'Collapse/Expand panel';
        toggleBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 8px;
            background: transparent;
            border: none;
            color: #ccc;
            font-size: 16px;
            cursor: pointer;
            user-select: none;
        `;

        const checkboxesContainer = document.createElement('div');
        checkboxesContainer.id = 'checkboxes-container';

        config.forEach(({ id, label }) => {
            const div = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = id;
            checkbox.checked = localStorage.getItem(id) === 'true';
            checkbox.onchange = () => {
                localStorage.setItem(id, checkbox.checked);
                location.reload();
            };

            const lbl = document.createElement('label');
            lbl.htmlFor = id;
            lbl.textContent = ' ' + label;

            div.appendChild(checkbox);
            div.appendChild(lbl);
            checkboxesContainer.appendChild(div);
        });

        panel.appendChild(toggleBtn);
        panel.appendChild(checkboxesContainer);
        document.body.appendChild(panel);

        const collapsed = localStorage.getItem('interfaceHiderPanelCollapsed') === 'true';
        if (collapsed) checkboxesContainer.style.display = 'none';

        toggleBtn.addEventListener('click', () => {
            if (checkboxesContainer.style.display === 'none') {
                checkboxesContainer.style.display = 'block';
                toggleBtn.textContent = '▼';
                localStorage.setItem('interfaceHiderPanelCollapsed', 'false');
            } else {
                checkboxesContainer.style.display = 'none';
                toggleBtn.textContent = '▶';
                localStorage.setItem('interfaceHiderPanelCollapsed', 'true');
            }
        });
    };

    const setupRedirects = () => {
        const path = location.pathname;
        for (const rule of REDIRECTS) {
            if (rule.path && path === rule.path) {
                location.href = rule.redirectTo;
            } else if (rule.pathPrefix && path.startsWith(rule.pathPrefix)) {
                location.href = rule.redirectTo;
            }
        }
    };

    const waitForElementsAndHide = () => {
        const observer = new MutationObserver(() => applyHiding());
        observer.observe(document.body, { childList: true, subtree: true });
        applyHiding();
    };

    setupRedirects();
    setupPanel();
    waitForElementsAndHide();
})();
