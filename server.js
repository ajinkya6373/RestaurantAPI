import express from "express";
import cors from "cors"
import connectDb from "./db/db.connect.js"; 
import 'dotenv/config';
import helmet from "helmet"
import restaurantRouter from "./router/restaurant.router.js"
import userRouter from "./router/user.router.js"
const app = express();
const PORT = 3000;
app.use(cors());
app.use(helmet());
app.use(express.json())
connectDb()
app.use("/restaurants", restaurantRouter);
app.use("/user", userRouter);

app.get('/', async (req, res) => {
    res.send('Welcome to Restaurant API.')
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
})


app.use((err, req, res, next) => {
    console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  });
  

app.listen(process.env.PORT || PORT, () => {
    console.log(`server started at ${PORT} port`);
})
