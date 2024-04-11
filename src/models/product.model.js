import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is missing"],
      trim: true
    },
    productImage: {
      type: [String]
    },
    productDescription: {
      type: String,
      required: [true, "Product description is missing"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is missing"],
      enum: ["neon light", "led light display"],
      set: value => value.toLowerCase()
    },
    price: {
      type: Number,
      required: [true, "Price is missing"]
    },
    hasDiscount: {
      type: Boolean,
      default: false
    },
    discount: {
      type: Number,
      default: 0
    },
    finalPrice: {
      type: Number,
      default: 0
    },
    tags: {
      type: [String],
      default: []
    },
    productId: {
      type: String,
      // required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

//added a pre hook that generates the productId field
productSchema.pre(`save`, async function (next) {
  // console.log(`this.isNew: ${this.isNew}`); //<-debugging line
  if (this.isNew) {
    const productNumber = await Product.countDocuments();
    // console.log(`productNumber: ${productNumber}`); //<-debugging line

    const uniqueId = Date.now().toString().substring(5, 10);

    if (this.category === `neon light`) {
      this.productId = `NEON${productNumber + 1}${uniqueId}`;
    } else if (this.category === `led light display`) {
      this.productId = `LLD${productNumber + 1}${uniqueId}`;
    }
  }
  next();
});

const Product = model("Product", productSchema);

export default Product;
