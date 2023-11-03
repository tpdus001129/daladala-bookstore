import mongoose from "mongoose";
import UserSchema from "./schemas/user.js";
import CategorySchema from "./schemas/category.js";
import OrderSchema from "./schemas/order.js";
import BookSchema from "./schemas/book.js";

export const Book = mongoose.model("Book", BookSchema);
export const Category = mongoose.model("Category", CategorySchema);
export const Order = mongoose.model("Order", OrderSchema);
export const User = mongoose.model("User", UserSchema);
