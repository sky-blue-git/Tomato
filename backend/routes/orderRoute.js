import express from "express";
import auth from "../middleware/auth.js";
import { updateStatus, listOrders, placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js";



const orderRouter = express.Router();

orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", auth, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;