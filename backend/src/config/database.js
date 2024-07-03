const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect('mongodb+srv://phamthuthao13a220142015:tPjTmfxno4sDsnQN@cluster0.q6pzghc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
};

module.exports = connectDatabase;