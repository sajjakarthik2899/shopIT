import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        maxLength: [200, "Product name cannot exceed 200 characters"],
        trim: true,
      },
      price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [8, "Price cannot exceed 5 digits"],
      },
      description: {
        type: String,
        required: [true, "Please enter product description"],
        maxLength: [1000, "Product description cannot exceed 200 characters"], 
      },
      rating: {
        type: Number,
        default: 0,
      },
      images: [
        {
          public_id: {
            type: String,
            required: true
          },
          url: {
            type: String,
            required: true
          },
        },
      ],
      category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Accessories",
                "Laptops",
                "Headphones",
                "Books",
                "Food",
                "Sports",
                "Outdoor",
                "Home"
            ],
            message:"Please correct category"
        }
      },
      seller: {
        type: String,
        required: [true, "Please enter product seller"]
      },
      stock: {
        type: Number,
        required: [true, "Please enter product stock"]
      },
      numOfReview: {
        type: Number,
        default: 0
      },
      reviews: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          rating: { type: Number, required: true },
          comment: { type: String, required: true },
          createdAt: { type: Date, default: Date.now }
        }
      ],
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false
      },
      createdAt: {
          type: Date,
          default: Date.now,
      }
})
export default mongoose.model('Product', productSchema);