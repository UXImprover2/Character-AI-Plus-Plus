(function() {
    'use strict';
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const style = document.createElement('style');
    style.textContent = `
        * {
            font-family: 'Roboto', sans-serif !important;
        }
    `;
    document.head.appendChild(style);
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === 1) {
                    node.style.fontFamily = "'Roboto', sans-serif";
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
