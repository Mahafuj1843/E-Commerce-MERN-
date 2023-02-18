import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    desc:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Brand",
    },
    quantity:{
        type: Number,
        required: true
    },
    sold:{
        type: Number,
        default: 0
    },
    image:[
        {
            url: String,
            publicId: String
        }
    ],
    color:{
        type: String,
        colors: ["Black", "White", "Red", "Blue", "Navy Blue", "Green", "Brown", "Ash", "Pink"]
    },
    rating: [
        { star: Number, 
          review: String,  
          postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
          date: {type: Date}
        }
    ],
    totalrating: {
        type: String,
        default: 0
    }
  },{timestamps: true}
  );

  export default mongoose.model("Product", ProductSchema)