import express, { json } from "express"
import authUser from "./userController/Route.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
// import friendRoutes from "../Backend/Routes/friendsRoute.js"
import router from "./Routes/friendsRoute.js";
import { Server } from "socket.io";


dotenv.config();

const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173","https://friend-slide-app.vercel.app" ],// frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.get("/test", (req, res) => {
    res.send("change in deploy!");
});
app.use("/api",authUser);
app.use("/api/friends",router)
app.get("/check-cookie", (req, res) => {
    console.log(req.cookies); // prints all cookies sent by the browser
    res.send(req.cookies);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
})