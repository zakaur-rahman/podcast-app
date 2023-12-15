import mongoose from "mongoose";

const Connect = async (URL) => {
    //const URL = `mongodb+srv://${username}:${password}@e-shop.2zicye4.mongodb.net/podcast-app?retryWrites=true&w=majority`

    try {
        await mongoose.connect(URL)
        console.log("Mongodb database connected.")

    } catch (err) {
        console.error(`Failed to connect database. ${err}`);
    };
};
export default Connect;