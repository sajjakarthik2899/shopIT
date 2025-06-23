import mongoose from "mongoose";
import products from "../models/products.js";
import groupProducts from './data.js'
const sendProducts = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/shopit")
        await products.insertMany(groupProducts);
        console.log("Products inserted")
    }catch(error){
        console.log("Error while sending the data")
        process.exit();
    }
}
sendProducts();