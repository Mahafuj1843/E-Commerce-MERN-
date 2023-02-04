import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: (value)=>{
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                .test(value)
            },
            message: props => `${props.value} is not an email.`
        }
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    tokens: { 
        token: {type:String}, 
        createdAt: {type:Date},
        expiresAt: {type:Date}
    },
    cart:{
        type: Array,
        default: []
    },
    address:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    }],
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
  },{timestamps: true, versionKey: false}
  );

  UserSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
  })

  export default mongoose.model("User", UserSchema)