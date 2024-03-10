const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [6, "Password should be more than 6 characters"]
    },
    pdf:
        [{
            title: {
                type: String,

            },
            PDFdata: {
                type: String,
            }
        }
        
        ],

    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,

})


//for encrpting the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
});


//compare password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("user", userSchema)