document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const body = document.body;
    const layer2 = document.getElementById('sidebar-layer-2');
    const mainNavLinks = document.querySelectorAll('.main-nav-link');
    const collapseBtns = document.querySelectorAll('.collapse-btn');
    const allPanels = document.querySelectorAll('.sidebar-layer-2 .panel-content');

    let activePanelId = null;

    const openLayer2 = (panelId) => {
        if (layer2.classList.contains('expanded') && activePanelId === panelId) {
            closeLayer2();
            return;
        }

        body.classList.add('layer2-expanded');
        layer2.classList.add('expanded');

        mainNavLinks.forEach(l => l.classList.remove('active'));
        document.querySelector(`.main-nav-link[data-panel="${panelId.replace('-panel', '')}"]`).classList.add('active');

        allPanels.forEach(p => p.classList.remove('active'));
        document.getElementById(panelId).classList.add('active');
        activePanelId = panelId;
    };

    const closeLayer2 = () => {
        body.classList.remove('layer2-expanded');
        layer2.classList.remove('expanded');
        mainNavLinks.forEach(l => l.classList.remove('active'));
        activePanelId = null;
    };

    mainNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const panelId = link.dataset.panel + '-panel';
            openLayer2(panelId);
        });
    });

    const toggleSidebar = () => {
        if (layer2.classList.contains('expanded')) {
            closeLayer2();
        }
        else {
            openLayer2();
        }
    }

    collapseBtns.forEach(btn => {
        btn.addEventListener('click', toggleSidebar);
    });

    document.querySelectorAll('.has-submenu').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            if (!layer2.classList.contains('expanded')) {
                openLayer2();
            }
            toggle.parentElement.classList.toggle('open');
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('[data-lucide="sun"]');
    const moonIcon = themeToggle.querySelector('[data-lucide="moon"]');

    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        } else {
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
        }
        localStorage.setItem('sidebar-theme', theme);
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('sidebar-theme') || 'dark';
    applyTheme(savedTheme);

    openLayer2(mainNavLinks[0].dataset.panel + '-panel');
    closeLayer2();
});