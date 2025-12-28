document.addEventListener('DOMContentLoaded', function() {
    class Application {
        constructor() {
            this.cacheDOM();
            this.initState();
            this.bindEvents();
            this.init();
        }

        cacheDOM() {
            this.DOM = {
                navLinks: document.querySelectorAll('.nav-link'),
                sections: document.querySelectorAll('.section'),
                sidebar: document.querySelector('.sidebar'),
                overlay: document.querySelector('.overlay'),
                mobileToggle: document.querySelector('.mobile-toggle'),
                musicBtn: document.getElementById('musicBtn'),
                bgMusic: document.getElementById('bgMusic'),
                footerCubes: document.getElementById('footerCubes'),
                volumeSlider: document.getElementById('volumeSlider'),
                volumeValue: document.getElementById('volumeValue'),
                refreshNewsBtn: document.getElementById('refreshNewsBtn')
            };
            
            this.mobileIcon = this.DOM.mobileToggle?.querySelector('i');
            this.newsContainer = document.getElementById('newsContainer');
        }

        initState() {
            this.isMenuOpen = false;
            this.isFirstInteraction = true;
            this.isNewsSectionActive = false;
            this.isLoadingNews = false;
        }

        bindEvents() {
            // Навигация
            this.DOM.navLinks.forEach(link => {
                link.addEventListener('click', (e) => this.handleNavClick(e));
            });

            // Мобильное меню
            if (this.DOM.mobileToggle) {
                this.DOM.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
            }

            if (this.DOM.overlay) {
                this.DOM.overlay.addEventListener('click', () => this.closeMobileMenu());
            }

            // Музыка
            if (this.DOM.musicBtn) {
                this.DOM.musicBtn.addEventListener('click', () => this.toggleMusic());
            }

            // Кнопка обновления новостей
            if (this.DOM.refreshNewsBtn) {
                this.DOM.refreshNewsBtn.addEventListener('click', () => this.handleRefreshNews());
            }

            // Глобальные события
            window.addEventListener('resize', () => this.handleResize());
            window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 100));
            window.addEventListener('keydown', (e) => this.handleKeydown(e));
            window.addEventListener('load', () => this.handleLoad());
        }

        init() {
            this.initVolume();
            this.createFooterCubes();
            this.updateRefreshButtonPosition();
        }

        // ==================== НОВОСТИ ====================
        async loadNews(force = false) {
            if (this.isLoadingNews) return;
            this.isLoadingNews = true;

            try {
                this.showLoadingState();
                await this.delay(300); // Имитация задержки

                const newsData = await this.fetchNewsData();
                this.displayNews(newsData);
            } catch (error) {
                console.error('Ошибка загрузки новостей:', error);
                this.displayError(error);
            } finally {
                this.hideLoadingState();
                this.isLoadingNews = false;
            }
        }

        async fetchNewsData() {
            try {
                const response = await fetch('news.json', {
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.json();
            } catch {
                return this.getFallbackData();
            }
        }

        getFallbackData() {
            return [

                {
                    "title": "Обновление сайта",
                    "icon": "fas fa-code",
                    "date": "2025-12-28",
                    "content": "Переработка сайта для повышения читаемости интерфейса и улучшения отображения стилей.",
                    "author": "Toaster",
                    "category": "Разработка"
                },     
                {
                    "title": "Обновление сайта",
                    "icon": "fas fa-code",
                    "date": "2025-12-15",
                    "content": "Сайт полностью переработал Toaster. Добавлил анимация кубиков в подвале сайта.",
                    "author": "Toaster",
                    "category": "Разработка"
                },
                {
                    "title": "Создание сайта",
                    "icon": "fas fa-server",
                    "date": "2025-08-13",
                    "content": "Supercret сделал сайт",
                    "author": "Supercret",
                    "category": "Разработка"
                },                    
            ];
        }

        displayNews(newsData) {
            if (!this.newsContainer) return;

            this.newsContainer.innerHTML = '';

            if (!newsData || newsData.length === 0) {
                this.newsContainer.innerHTML = this.createEmptyNewsMessage();
                return;
            }

            const sortedNews = [...newsData].sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );

            sortedNews.forEach(item => {
                this.newsContainer.appendChild(this.createNewsCard(item));
            });
        }

        createNewsCard(item) {
            const card = document.createElement('div');
            card.className = 'news-card';

            const formattedDate = this.formatDate(item.date);
            const iconClass = item.icon || this.getIconByCategory(item.category);

            card.innerHTML = `
                <div class="news-header">
                    <h3><i class="${iconClass}"></i> ${item.title || 'Новая запись'}</h3>
                    <span class="news-date" title="${item.date}">${formattedDate}</span>
                </div>
                <div class="news-content">
                    <p>${item.content || 'Описание отсутствует'}</p>
                </div>
                <div class="news-footer">
                    <span class="news-author"><i class="fas fa-user"></i> ${item.author || 'Команда'}</span>
                    <span class="news-category">${item.category || 'Общее'}</span>
                </div>
            `;

            return card;
        }

        formatDate(dateString) {
            try {
                return new Date(dateString).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch {
                return dateString || 'Дата не указана';
            }
        }

        getIconByCategory(category) {
            const icons = {
                'Разработка': 'fas fa-code',
                'Ивент': 'fas fa-calendar-alt',
                'Обновление': 'fas fa-sync-alt',
                'Важное': 'fas fa-exclamation-circle',
                'default': 'fas fa-newspaper'
            };
            return icons[category] || icons.default;
        }

        showLoadingState() {
            if (this.DOM.refreshNewsBtn) {
                this.DOM.refreshNewsBtn.classList.add('spinning');
            }

            if (this.newsContainer) {
                this.newsContainer.innerHTML = `
                    <div class="news-card">
                        <div class="news-content">
                            <p style="text-align: center;"><i class="fas fa-spinner fa-spin"></i> Загрузка...</p>
                        </div>
                    </div>
                `;
            }
        }

        hideLoadingState() {
            if (this.DOM.refreshNewsBtn) {
                setTimeout(() => {
                    this.DOM.refreshNewsBtn.classList.remove('spinning');
                }, 500);
            }
        }

        displayError(error) {
            if (!this.newsContainer) return;

            this.newsContainer.innerHTML = `
                <div class="news-card">
                    <div class="news-header">
                        <h3><i class="fas fa-exclamation-triangle"></i> Ошибка</h3>
                    </div>
                    <div class="news-content">
                        <p>Не удалось загрузить новости. Попробуйте позже.</p>
                        <details style="margin-top: 10px;">
                            <summary>Детали</summary>
                            <p style="font-size: 0.9em; color: var(--text-muted);">${error.message}</p>
                        </details>
                    </div>
                </div>
            `;
        }

        // ==================== НАВИГАЦИЯ ====================
        setActiveSection(targetId, forceReload = false) {
            const currentActive = document.querySelector('.section.active');
            if (currentActive?.id === targetId && !forceReload) return;

            // Сброс активных классов
            this.DOM.navLinks.forEach(link => link.classList.remove('active'));
            this.DOM.sections.forEach(section => section.classList.remove('active'));

            // Активация новой секции
            const targetLink = document.querySelector(`[data-target="${targetId}"]`);
            const targetSection = document.getElementById(targetId);

            targetLink?.classList.add('active');
            targetSection?.classList.add('active');

            // Управление видимостью кнопки обновления
            this.isNewsSectionActive = targetId === 'news';
            this.isNewsSectionActive ? this.showRefreshButton() : this.hideRefreshButton();

            // Загрузка новостей если нужно
            if (targetId === 'news' && (!this.newsContainer.children.length || forceReload)) {
                setTimeout(() => this.loadNews(), 100);
            }

            this.closeMobileMenu();
        }

        handleNavClick(e) {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('data-target');
            if (!targetId) return;

            const targetSection = document.getElementById(targetId);
            const isAlreadyActive = targetSection?.classList.contains('active');

            this.setActiveSection(targetId, !isAlreadyActive);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }

        // ==================== МОБИЛЬНОЕ МЕНЮ ====================
        toggleMobileMenu() {
            this.isMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
        }

        openMobileMenu() {
            if (!this.DOM.sidebar || !this.DOM.overlay) return;

            this.DOM.sidebar.classList.add('open');
            this.DOM.overlay.classList.add('active');
            this.isMenuOpen = true;

            if (this.mobileIcon) {
                this.mobileIcon.classList.replace('fa-bars', 'fa-times');
            }

            document.body.style.overflow = 'hidden';
            this.updateRefreshButtonPosition();
        }

        closeMobileMenu() {
            if (!this.DOM.sidebar || !this.DOM.overlay) return;

            this.DOM.sidebar.classList.remove('open');
            this.DOM.overlay.classList.remove('active');
            this.isMenuOpen = false;

            if (this.mobileIcon) {
                this.mobileIcon.classList.replace('fa-times', 'fa-bars');
            }

            document.body.style.overflow = '';
            this.updateRefreshButtonPosition();
        }

        // ==================== АУДИО ====================
        initVolume() {
            const savedVolume = localStorage.getItem('musicVolume');
            const defaultVolume = 30;

            const volume = savedVolume !== null ? parseInt(savedVolume) : defaultVolume;
            this.setVolume(volume);
            this.updateSliderProgress(volume);

            this.DOM.volumeSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                this.setVolume(value);
                this.updateSliderProgress(value);
                localStorage.setItem('musicVolume', value);

                if (this.isFirstInteraction && this.DOM.bgMusic.paused) {
                    this.isFirstInteraction = false;
                    this.playMusic();
                }
            });
        }

        setVolume(value) {
            const volume = value / 100;
            this.DOM.bgMusic.volume = volume;
            this.DOM.volumeValue.textContent = `${value}%`;
            this.DOM.volumeSlider.value = value;
        }

        updateSliderProgress(value) {
            this.DOM.volumeSlider.style.setProperty('--slider-progress', `${value}%`);
        }

        toggleMusic() {
            if (!this.DOM.bgMusic) return;

            if (this.DOM.bgMusic.paused) {
                this.playMusic();
            } else {
                this.pauseMusic();
            }
        }

        playMusic() {
            this.DOM.bgMusic.play()
                .then(() => {
                    this.DOM.musicBtn.innerHTML = '<i class="fas fa-pause"></i><span>Выключить</span>';
                    this.DOM.musicBtn.style.background = 'linear-gradient(135deg, var(--primary-dark), var(--primary))';
                    this.isFirstInteraction = false;
                })
                .catch(error => {
                    console.warn('Автовоспроизведение заблокировано:', error);
                });
        }

        pauseMusic() {
            this.DOM.bgMusic.pause();
            this.DOM.musicBtn.innerHTML = '<i class="fas fa-music"></i><span>Включить</span>';
            this.DOM.musicBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
        }

        // ==================== ВСПОМОГАТЕЛЬНЫЕ ====================
        createFooterCubes() {
            if (!this.DOM.footerCubes) return;

            this.DOM.footerCubes.innerHTML = '';
            const cubeCount = Math.floor(Math.random() * 6) + 5;
            const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

            for (let i = 0; i < cubeCount; i++) {
                const cube = document.createElement('div');
                cube.className = 'cube-in-footer';

                const size = Math.floor(Math.random() * 15) + 15;
                const top = Math.random() * 80;
                const speed = Math.random() * 20 + 30;
                const delay = Math.random() * 10;
                const color = colors[Math.floor(Math.random() * colors.length)];

                cube.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    top: ${top}%;
                    animation-duration: ${speed}s;
                    animation-delay: -${delay}s;
                    background: ${color};
                    opacity: ${0.3 + Math.random() * 0.4};
                `;

                this.DOM.footerCubes.appendChild(cube);
            }
        }

        handleRefreshNews() {
            if (this.isNewsSectionActive) {
                this.setActiveSection('news', true);
            } else {
                this.setActiveSection('news');
                const newsSection = document.getElementById('news');
                if (newsSection) {
                    window.scrollTo({
                        top: newsSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        }

        showRefreshButton() {
            if (this.DOM.refreshNewsBtn) {
                this.DOM.refreshNewsBtn.classList.add('show');
                this.updateRefreshButtonPosition();
            }
        }

        hideRefreshButton() {
            if (this.DOM.refreshNewsBtn) {
                this.DOM.refreshNewsBtn.classList.remove('show');
            }
        }

        updateRefreshButtonPosition() {
            if (!this.DOM.refreshNewsBtn) return;

            if (window.innerWidth > 1024) {
                this.DOM.refreshNewsBtn.style.right = 'calc(var(--spacing-md) + var(--sidebar-width))';
            } else if (this.isMenuOpen) {
                this.DOM.refreshNewsBtn.style.right = 'calc(100% - 320px + var(--spacing-md))';
            } else {
                this.DOM.refreshNewsBtn.style.right = 'var(--spacing-md)';
            }
        }

        handleResize() {
            if (window.innerWidth > 1024 && this.isMenuOpen) {
                this.closeMobileMenu();
            }

            this.createFooterCubes();
            this.updateRefreshButtonPosition();
        }

        handleScroll() {
            if (this.isMenuOpen) return;

            this.updateActiveSectionOnScroll();
            this.updateParallax();
        }

        updateActiveSectionOnScroll() {
            const scrollPosition = window.scrollY + 100;

            this.DOM.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.id;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    if (!section.classList.contains('active')) {
                        this.setActiveSection(sectionId);
                    }
                }
            });
        }

        updateParallax() {
            const bgGrid = document.querySelector('.bg-grid');
            if (!bgGrid) return;

            const scrollY = window.scrollY;
            const speed = 0.3;
            bgGrid.style.backgroundPosition = `0 ${scrollY * speed}px, 30px ${30 + scrollY * speed}px`;
        }

        handleKeydown(e) {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        }

        handleLoad() {
            this.createFooterCubes();
            this.initVolume();
            this.updateRefreshButtonPosition();

            // Начальная загрузка если активны новости
            if (this.isNewsSectionActive) {
                this.loadNews();
            }

            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 100);
        }

        // Утилиты
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        createEmptyNewsMessage() {
            return `
                <div class="news-card">
                    <div class="news-header">
                        <h3><i class="fas fa-newspaper"></i> Новостей пока нет</h3>
                    </div>
                    <div class="news-content">
                        <p>Следите за обновлениями. Скоро здесь появятся свежие новости!</p>
                    </div>
                </div>
            `;
        }
    }

    // Инициализация приложения
    new Application();
});