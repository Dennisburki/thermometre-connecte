
import mongoose from "mongoose";

export async function connectDB()
{
    try
    {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "thermometre"
        });

        console.log("MongoDB connecté à la base thermometre !");
    } catch (error)
    {
        console.error("Erreur de connexion MongoDB :", error);
        throw error;
    }
}
