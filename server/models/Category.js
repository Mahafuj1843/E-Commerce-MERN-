import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
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
    image:{
        type: String
    }
  },{timestamps: true}
  );

  export default mongoose.model("Category", CategorySchema)