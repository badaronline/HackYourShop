import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/categories.js";
import paymentRouter from "./routes/payment.js";
import signupRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import updateUserRouter from "./routes/updateUser.js";
import orderRouter from "./routes/order.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/profile", updateUserRouter);
app.use("/api/order", orderRouter);

export default app;
