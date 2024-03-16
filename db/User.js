const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    user_account:{
        type: String,
        required: true,
        unique: true,
    },
    user_password: {
        type: String,
        required: true,
    },
    user_role: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('user_password')) return next();

    try {
        this.password = await bcrypt.hashSync(this.password, 10); // Hash password
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;