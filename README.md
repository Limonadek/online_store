# online_store

##   [диаграмма базы данных](https://drive.google.com/file/d/1Vpaf-yZRTyhffxhw4vUJ4FxaGbPlwp5s/view?usp=sharing)

Полноценный сайт для продажи устройств и не только

### Страницы:
- Главная
- Страница товара
- Страница авторизации и регистрации
- Страница админа
- Страница корзины
- Страница оформление заказа

### Стек:
- Node.js
- Sequelize
- React.js
- Bootstrap


#
# Шаги для запуска


### Фронтенд:
- В папке client выполнить команду npm install и следом npm run start

### Бэкенд:
- Создать контейнер, для этого в терминале Linux вписать 
```
docker run --name online_shop -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```
- В папке server выполнить команду npm install и следом npm run dev

Сайт доступен по адресу http://localhost:3000/
