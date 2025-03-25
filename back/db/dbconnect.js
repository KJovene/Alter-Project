import mongoose from 'mongoose';    

const dbConnect = (MongoURI, DB_NAME) => {
    mongoose
        .connect(MongoURI, { dbName: DB_NAME})
        .then(() => console.log('Connected to database'))
        .catch((err) => console.log(err))
}

export default dbConnect;