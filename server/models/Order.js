import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    products:[
        {  
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
            color: String,
        }
    ],
    subTotal: Number,
    discount:{
        coupon: String,
        discounts: Number,
    },
    total: Number,
    payment: {
        paymentId: String,
        paymetType: String,
        amount: Number
    },
    orderStatus:{
        type: String,
        default: "Pending",
        enum: [
            "Pending",
            "Processing",
            "Cancelled",
            "Shipping",
            "Delivered"
        ]
    },
    deliveryDate: Date,
    orderBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    shipping:{
        fullname: String,
        phone: String,
        streetAddress: String,
        village: String,
        state: String,
        city: String
    }
  },{timestamps: true, versionKey: false}
  );

  export default mongoose.model("Order", OrderSchema)