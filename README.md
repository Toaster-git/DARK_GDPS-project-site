# DARK GDPS Project Website

**Language:** [РУССКИЙ](#русский) | [ENGLISH](#english)

---

# ENGLISH

**Demo site:** [https://toaster-git.github.io/DARK_GDPS-project-site/](https://toaster-git.github.io/DARK_GDPS-project-site/)

[![AGPL-3.0 License](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

A static website for the **DARK GDPS** project (Geometry Dash Private Server). This website serves as an information hub and was created as part of learning web development.

## ✨ Features and Functionality

*   **Dynamic Content Loading**: News and other content are loaded onto the page from an external JSON file (`news.json`), simplifying information updates without changing the HTML code.
*   **Tab Navigation**: All content is placed on a single HTML page with smooth switching between sections (e.g., "Home", "News", "About the Server").
*   **Clean and Responsive Interface**: A simple design using CSS that displays correctly on various devices.
*   **Automatic Deployment**: Configured GitHub Actions workflow for automatic site publication on GitHub Pages when the main branch (`main`) is updated.

## 🛠 Technologies

The project is built on basic frontend technologies:
*   **HTML5** – semantic page structure markup.
*   **CSS3** – styling and visual design.
*   **Vanilla JavaScript (ES6)** – implementation of dynamic logic (data loading, tab switching).
*   **JSON** – format for storing and transmitting structured data.

## 🚀 Getting Started

### Prerequisites

For local project launch, you only need a web browser and any text editor (e.g., VS Code, Sublime Text).

### Installation and Local Launch

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Toaster-git/DARK_GDPS-project-site.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd DARK_GDPS-project-site
    ```
3.  **Launch the site:** Open the `index.html` file in your browser. You can do this by double-clicking.
    </br></br> **But it is recommended** to use a local server.
    </br> For example, using Python:
    ```(cmd) python -m SimpleHTTPServer 8000 ```
    </br> and without closing the console, go to ```(browser) http://localhost:8000```

## 📖 Usage

### How to Add News?

1.  Open the `news.json` file.
2.  Add a new object to the `news` array, following the existing format:
    ```json
    {
      "title": "Your News Title",
      "date": "2026-01-06",
      "content": "News text. HTML markup is supported, for example, <b>bold text</b> or <a href='#'>links</a>."
    }
    ```
3.  Save the file. When you refresh the browser page, the new news will automatically appear in the corresponding section of the site.

### Project Structure

```
DARK_GDPS-project-site/
├── index.html          # Main HTML file
├── style.css           # Stylesheet file (CSS)
├── script.js           # Main JavaScript logic
├── news.json           # News data file (JSON)
├── LICENSE             # Full AGPL-3.0 license text
└── .github/workflows/  # CI/CD configuration directory (GitHub Actions)
    └── static.yml      # Workflow for automatic deployment to GitHub Pages
```

## 🤝 Contributing

Any contributions are welcome! If you have ideas for improving the design, functionality, or have found a bug:

1.  Fork the repository.
2.  Create a new branch for your feature or fix:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  Make changes and commit them:
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  Push the changes to your fork:
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  Open a Pull Request to the main repository.

## 📄 License

This project is distributed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. Detailed information can be found in the [LICENSE](LICENSE) file.

**Briefly:** You are free to use, study, modify, and distribute this code, but if you provide a modified version of the program, including as a web service (website), you **must** make the source code of this modified version available to all users.

## 📞 Contacts

Project Author: **Toaster-git**
*   GitHub: [https://github.com/Toaster-git](https://github.com/Toaster-git)
</br>

*   This project was created for my friend's personal Geometry Dash server project — DARK GDPS. (I'm surprised these exist:)

---
*If this project was useful to you, don't forget to give it a ⭐ star in the repository!*

---

# РУССКИЙ

**Демо-сайт:** [https://toaster-git.github.io/DARK_GDPS-project-site/](https://toaster-git.github.io/DARK_GDPS-project-site/)

[![AGPL-3.0 License](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

Статический веб-сайт для проекта **DARK GDPS** (Geometry Dash Private Server). Этот сайт служит информационным центром и был создан в рамках обучения веб-разработке.

## ✨ Особенности и функционал

*   **Динамическая загрузка контента**: Новости и другой контент загружаются на страницу из внешнего JSON-файла (`news.json`), что упрощает обновление информации без изменения HTML-кода.
*   **Навигация по вкладкам (Tabs)**: Весь контент размещен на одной HTML-странице с плавным переключением между разделами (например, "Главная", "Новости", "О сервере").
*   **Чистый и отзывчивый интерфейс**: Простой дизайн с использованием CSS, который корректно отображается на различных устройствах.
*   **Автоматическое развертывание**: Настроен GitHub Actions workflow для автоматической публикации сайта на GitHub Pages при обновлении главной ветки (`main`).

## 🛠 Технологии

Проект построен на базовых фронтенд-технологиях:
*   **HTML5** – семантическая разметка структуры страницы.
*   **CSS3** – стилизация и визуальное оформление.
*   **Vanilla JavaScript (ES6)** – реализация динамической логики (загрузка данных, переключение вкладок).
*   **JSON** – формат хранения и передачи структурированных данных.

## 🚀 Начало работы

### Предварительные требования

Для локального запуска проекта вам понадобится только веб-браузер и любой текстовый редактор (например, VS Code, Sublime Text).

### Установка и локальный запуск

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/Toaster-git/DARK_GDPS-project-site.git
    ```
2.  **Перейдите в директорию проекта:**
    ```bash
    cd DARK_GDPS-project-site
    ```
3.  **Запустите сайт:** Откройте файл `index.html` в вашем браузере. Вы можете сделать это двойным кликом
</br></br> **Но рекомендуется** через локальный сервер.
</br> Например через пайтон
```(cmd) python -m SimpleHTTPServer 8000 ```
</br> и не выключая консоль зайти в браузере на ```(browser) http://localhost:8000```

## 📖 Использование

### Как добавить новость?

1.  Откройте файл `news.json`.
2.  Добавьте новый объект в массив `news`, следуя существующему формату:
    ```json
    {
      "title": "Заголовок вашей новости",
      "date": "2026-01-06",
      "content": "Текст новости. Поддерживается HTML-разметка, например, <b>жирный текст</b> или <a href='#'>ссылки</a>."
    }
    ```
3.  Сохраните файл. При обновлении страницы браузера новая новость автоматически появится в соответствующем разделе сайта.

### Структура проекта

```
DARK_GDPS-project-site/
├── index.html          # Главный HTML-файл
├── style.css           # Файл со стилями (CSS)
├── script.js           # Основная логика на JavaScript
├── news.json           # Файл с данными для новостей (JSON)
├── LICENSE             # Полный текст лицензии AGPL-3.0
└── .github/workflows/  # Директория с настройками CI/CD (GitHub Actions)
    └── static.yml      # Workflow для автоматического развертывания на GitHub Pages
```

## 🤝 Вклад в проект

Любые вклады приветствуются! Если у вас есть идеи по улучшению дизайна, функциональности или вы нашли ошибку:

1.  Создайте форк (Fork) репозитория.
2.  Создайте новую ветку для вашей функции или исправления:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  Внесите изменения и сделайте коммит:
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  Отправьте изменения в ваш форк:
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  Откройте Pull Request в основном репозитории.

## 📄 Лицензия

Этот проект распространяется под лицензией **GNU Affero General Public License v3.0 (AGPL-3.0)**. Подробную информацию можно найти в файле [LICENSE](LICENSE).

**Кратко:** Вы можете свободно использовать, изучать, изменять и распространять этот код, но если вы предоставляете модифицированную версию программы в том числе веб-сервис (сайт), вы **обязаны** сделать исходный код этой модифицированной версии доступным для всех пользователей.

## 📞 Контакты

Автор проекта: **Toaster-git**
*   GitHub: [https://github.com/Toaster-git](https://github.com/Toaster-git)
</br>

*   Этот проект создан для личного проекта моего друга сервера в Geometry Dash — DARK GDPS.(Сам удивлёт что такие бывают:)

---
*Если этот проект был вам полезен, не забудьте поставить ⭐ звезду в репозитории!*
