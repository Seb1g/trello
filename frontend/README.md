# Trello Clone
Это клон приложения Trello, реализованный с использованием архитектуры Feature-Sliced Design (FSD).  
Основной стек для фронтенда: **React + TypeScript + SCSS + Redux Toolkit**.  
Проект включает в себя функционал аутентификации (вход и регистрация), управление досками и карточками, а также Drag & Drop для карточек.
## Структура проекта
/src 
├── app/ # Инициализация приложения (провайдеры, роуты, store) 
├── shared/ # Общие компоненты, API-клиент, утилиты, стили 
├── entities/ # Сущности (User, Board, Card) с моделью, UI и типами 
├── features/ # Фичи (auth, boardManagement, cardManagement и т.д.) 
├── widgets/ # Крупные UI-компоненты (Navbar, KanbanBoard, AuthForm) 
└── pages/ # Страницы приложения (LoginPage, RegisterPage, Dashboard, BoardPage)
## Основной функционал
- **Аутентификация:** Вход и регистрация пользователей с использованием Redux Toolkit, [React Hook Form](https://react-hook-form.com/) и [axios](https://axios-http.com/).
- **Управление досками и карточками:** Создание, редактирование, удаление и перемещение задач.
- **UI:** Использование SCSS-модулей для стилизации и создание переиспользуемых компонентов.
## Установка и запуск
1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/your-username/trello-clone.git
   cd trello-clone