import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/products.js";
import APIFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 10;
    console.log(req.query,"req.query")
    const apiFeature = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .sort()
        .paginate(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        count: products.length,
        products,
    });
});
export const findProduct = catchAsyncError(async (req, res, next) => {
    const productFound = await Product.findById(req?.params?.id);
    if(!productFound){
        return next(new ErrorHandler("Product not found",404))
    }
    res.status(200).json({
        productFound
    });
});
export const findProductAndUpdate = catchAsyncError(async (req, res) => {
    let product = await Product.findById(req?.params?.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true
    });
    res.status(200).json({
        product
    });
});
export const findProductAndDelete = catchAsyncError(async (req, res) => {
    let product = await Product.findById(req?.params?.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    product = await Product.deleteOne({ _id: product.id })
    res.status(200).json({
        message: "Product Deleted"
    });
});
export const createProduct = catchAsyncError(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        product
    });
});