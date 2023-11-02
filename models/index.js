import mongoose from "mongoose";
import UserSchema from "./schemas/user";
import CategorySchema from "./schemas/category";
import OrderSchema from "./schemas/order";
import BookSchema from "./schemas/book";

export const Book = mongoose.model("Book", BookSchema);
export const Category = mongoose.model("Category", CategorySchema);
export const Order = mongoose.model("Order", OrderSchema);
export const User = mongoose.model("User", UserSchema);
