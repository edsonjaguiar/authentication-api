import mongoose from 'mongoose';

const MONGO_URI: string = process.env.MONGO_URI!;

export const connectionMongodb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database is connected');
    } catch (err) {
        console.log(err);
    }
};
