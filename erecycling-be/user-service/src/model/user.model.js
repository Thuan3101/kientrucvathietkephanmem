const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name could not be empty"],
    },
    lastName: { type: String, required: [true, "Last name should not be empty!"] },
    phone: { type: String},
    email: {
        type: String,
        trim: true,
        index: { unique: true },
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 4,
    },
    photo: {
        type: String,
        default: "https://avatar.iran.liara.run/public/boy?username=Ash",
    },
    role: {
        type: String,
        enum: ["admin", "staff", "customer"],
        required: true,
        default: "customer",
    },

    address: {
        formattedAddress: String,
        street: String,
        ward: String,
        district: String,
        city: String
    },

    active: {
        type: Boolean,
        default: true,

    },

    birthDay: { type: Date, default: new Date(1991, 1, 1) },
}, {
    timestamps: true,
});

// userSchema.path("password").select(false);
// Statics
userSchema.statics.compare = async (candidatePassword, password) => {
    return await bcrypt.compare(candidatePassword, password);
};

userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;