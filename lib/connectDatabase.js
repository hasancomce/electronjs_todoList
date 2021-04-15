const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/electronjs-todo-app/todos", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDb Connection Successfull");
    })
    .catch(err => {
        console.error(err);
    });
};

module.exports = connectDatabase;