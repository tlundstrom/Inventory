const mongoose = require("mongoose");
const bcrypt =require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',

    },
    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters in length"],
        required: [true, "Password is required"]

    }
}, {timestamps:true})


UserSchema.virtual("confirmPassword")
    .get(()=>this._confirmPassword)
    .set((value)=>this._confirmPassword = value)


UserSchema.pre("validate", function(next){
    if(this.password!== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match.");
        console.log("Passwords don't match!");
    }
    next();
})

UserSchema.pre("save", function(next){
    console.log("in presave");
    bcrypt.hash(this.password, 10)
        .then((hashedPassword)=>{
            this.password = hashedPassword;
            next();
        })
})

const User = mongoose.model("User", UserSchema);

module.exports = User;