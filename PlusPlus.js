(function() {
    'use strict';

    const targetSelectors = [
        "#__next > div > main > div > div > div > aside > div > div.overflow-hidden.transition-all.ease-out.duration-300.hidden.lg\\:block.max-w-64.translate-x-0 > div > div > div.grid.items-center.w-full.grid-cols-2.pt-6.pl-6 > a > div",
        "#__next > div > main > div > div > div > aside > div > div.flex.w-screen.h-dvh > div.absolute.top-0.z-10.w-64.h-full.border-r.border-r-accent.bg-primary-foreground > div > div > div > div.grid.items-center.w-full.grid-cols-2.pt-6.pl-6 > a > div"
    ];

    function createPlusSVG() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "20");  
        svg.setAttribute("height", "20"); 
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.style.display = 'block';

        const line1 = document.createElementNS(svgNS, "line");
        line1.setAttribute("x1", "12");
        line1.setAttribute("y1", "5");
        line1.setAttribute("x2", "12");
        line1.setAttribute("y2", "19");
        line1.setAttribute("stroke", "#eeb82e");
        line1.setAttribute("stroke-width", "3");

        const line2 = document.createElementNS(svgNS, "line");
        line2.setAttribute("x1", "5");
        line2.setAttribute("y1", "12");
        line2.setAttribute("x2", "19");
        line2.setAttribute("y2", "12");
        line2.setAttribute("stroke", "#eeb82e");
        line2.setAttribute("stroke-width", "3");

        svg.appendChild(line1);
        svg.appendChild(line2);

        return svg;
    }

    function addPluses() {
        targetSelectors.forEach(selector => {
            const container = document.querySelector(selector);
            if (container && !container.querySelector('.yellow-pluses')) {
                container.style.position = 'relative';

                const plusContainer = document.createElement('div');
                plusContainer.className = 'yellow-pluses';
                plusContainer.style.position = 'absolute';
                plusContainer.style.top = '50%';
                plusContainer.style.left = '115%';
                plusContainer.style.transform = 'translate(-50%, -50%)';
                plusContainer.style.display = 'flex';
                plusContainer.style.gap = '1px';
                plusContainer.style.pointerEvents = 'none';

                plusContainer.appendChild(createPlusSVG());
                plusContainer.appendChild(createPlusSVG());

                container.appendChild(plusContainer);

                console.log('Added two very close yellow SVG pluses near the text for selector:', selector);
            }
        });
    }

    const observer = new MutationObserver(() => {
        addPluses();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    addPluses();
})();
