(function() {
    'use strict';

    const faviconList = [
        'https://i.pinimg.com/736x/22/a9/f5/22a9f56c3c34cd1dc7f365b68b3cb356.jpg',
        'https://i.pinimg.com/736x/a4/31/46/a43146bd922c08dbb85c92e716e724af.jpg',
        'https://i.pinimg.com/736x/46/db/10/46db10f635aa41337668d36eabf71e84.jpg',
        'https://makiai.com/wp-content/uploads/2023/03/characterlogo.png',
        'https://i.pinimg.com/736x/82/51/e4/8251e4e13623b01db56fa27f321ca55a.jpg',
        'https://i.pinimg.com/736x/19/f9/d8/19f9d8c4b22f3f1828e6f71b6e5b0162.jpg',
        'https://media.licdn.com/dms/image/sync/v2/D5627AQFcfb8mkYGLYw/articleshare-shrink_800/articleshare-shrink_800/0/1738957014411?e=2147483647&v=beta&t=T2OnfFboWFfOkzMcrhJksmdpGZ1kQf5Xy04NEG05Ao4',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZdlQZuofLXmOMTUGyARRryxn9185akjZzA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXKscL2R06FmxYay_YIL0X3BTrNe4gKrEoIQ&s',
        'https://i.pinimg.com/736x/36/ae/b4/36aeb4bb2fceeea2d2feb98022952a88.jpg',
        'https://i.pinimg.com/736x/51/0a/b1/510ab126b4119427c806d37a135dd502.jpg'
    ];

    let panel;

    function createPanel() {
        if (panel) return;

        panel = document.createElement('div');
        panel.style.position = 'fixed';
        panel.style.top = '20px';
        panel.style.right = '20px';
        panel.style.background = 'rgba(255, 255, 255, 0.15)';
        panel.style.backdropFilter = 'blur(10px)';
        panel.style.border = '1px solid rgba(255,255,255,0.3)';
        panel.style.borderRadius = '12px';
        panel.style.padding = '15px';
        panel.style.zIndex = '9999';
        panel.style.width = '320px';
        panel.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
        panel.style.fontFamily = 'Arial, sans-serif';
        panel.style.fontSize = '14px';
        panel.style.opacity = '1';
        panel.style.transition = 'opacity 0.4s ease'; // плавная анимация
        panel.style.display = 'block';

        panel.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <b style="color:#fff;">Select or Upload Favicon</b>
                <span id="closePanel" style="cursor:pointer;font-weight:bold;color:#fff;">&#10005;</span>
            </div>
        `;

        faviconList.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.margin = '5px';
            img.style.cursor = 'pointer';
            img.onclick = () => setFavicon(url);
            panel.appendChild(img);
        });

        const upload = document.createElement('input');
        upload.type = 'file';
        upload.accept = 'image/*';
        upload.style.marginTop = '10px';
        upload.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(evt) {
                setFavicon(evt.target.result);
            }
            reader.readAsDataURL(file);
        };
        panel.appendChild(upload);

        const footer = document.createElement('div');
        footer.style.marginTop = '12px';
        footer.style.textAlign = 'center';
        footer.style.fontSize = '12px';
        footer.style.color = '#fff';
        footer.innerHTML = `by <a href="https://github.com/UXImprover2" target="_blank" style="color:#0af;text-decoration:underline;">UXImprover</a>`;
        panel.appendChild(footer);

        document.body.appendChild(panel);

        document.getElementById('closePanel').onclick = () => {
            panel.style.opacity = '0'; // плавное исчезновение
            setTimeout(() => panel.style.display = 'none', 400); // скрываем после анимации
            localStorage.setItem('faviconPanelHidden', 'true');
        };
    }

    function setFavicon(url) {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = url;
        console.log('Favicon updated!');
    }

    function shouldShowPanel() {
        return localStorage.getItem('faviconPanelHidden') !== 'true';
    }

    function showPanel() {
        if (!panel) createPanel();
        panel.style.display = 'block';
        setTimeout(() => panel.style.opacity = '1', 10); // плавное появление
        localStorage.removeItem('faviconPanelHidden');
    }

    if (document.body) {
        if (shouldShowPanel()) createPanel();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            if (shouldShowPanel()) createPanel();
        });
    }

    // Горячая клавиша Ctrl+Shift+K для показа панели
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyK') {
            showPanel();
        }
    });

})();
