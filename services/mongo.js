const mongoose = require('mongoose');
const { MONGO_PASSWORD, MONGO_USER, MONGO_DB_NAME } = process.env;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.bebxr.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false };

(async () => {
    try {
        await mongoose.connect(uri, options);
        console.log('connected to mongo');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
)();
