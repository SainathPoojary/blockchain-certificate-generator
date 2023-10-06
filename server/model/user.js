const { Schema, model } = require("mongoose");

const certificateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const userSchema = new Schema({
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    certificates: {
        type: [certificateSchema],
    },
});

const User = model("user", userSchema);
module.exports = User;
