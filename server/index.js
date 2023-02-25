const express = require('express');
const sequelize = require('./db.js');
const models = require('./models/models.js');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index.js');
const errorHadler = require('./middleware/ErrorHandlingMiddleware.js');
const path = require('path');

const PORT = process.env.PORT || 5000;



const app = express();
app.use(cors()); //чтобы могли посылать запросы
app.use(express.json()); //чтобы приложение могло парсить в json формате
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({})); //нужен для картинок
app.use('/api', router);

// Обработка ошибок, последний Middleware
app.use(errorHadler);

const start = async () => {
    try {
        await sequelize.authenticate(); //подключение к дб
        await sequelize.sync(); // сверяет состояние бд со схемой
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
