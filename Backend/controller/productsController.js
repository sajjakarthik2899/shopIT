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
    req.body.user = req.user._id;
    const product = await Product.create(req.body);
    res.status(200).json({
        product
    });
});
export const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("reviews.user", "name");

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
export const createOrUpdateReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const existingReviewIndex = product.reviews.findIndex(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (existingReviewIndex !== -1) {
    // Update existing review
    product.reviews[existingReviewIndex].rating = Number(rating);
    product.reviews[existingReviewIndex].comment = comment;
    product.reviews[existingReviewIndex].createdAt = new Date();
  } else {
    // Add new review
    product.reviews.push({
      user: req.user._id,
      rating: Number(rating),
      comment,
      createdAt: new Date()
    });
  }

  // Recalculate rating and count
  product.numOfReview = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: existingReviewIndex !== -1 ? "Review updated" : "Review added",
    reviews: product.reviews,
  });
});
export const deleteMyReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (r) => r.user.toString() !== req.user._id.toString()
  );

  const numOfReview = reviews.length;
  const rating =
    reviews.reduce((acc, item) => item.rating + acc, 0) / (numOfReview || 1);

  product.reviews = reviews;
  product.numOfReview = numOfReview;
  product.rating = rating;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Your review has been deleted",
  });
});