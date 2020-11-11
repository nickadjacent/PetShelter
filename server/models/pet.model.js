const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            minlength: [3, "Name must be at least {MINLENGTH} characters"]
        },
        description: {
            type: String,
            required: [true, "Description is required."],
            minlength: [3, "Description must be at least {MINLENGTH} characters"]
        },
        petType: {
            type: String,
            required: [true, "Type of pet is required."],
            minlength: [3, "Must be at least {MINLENGTH} characters"]
        },
        firstSkill: {
            type: String,
        },
        secondSkill: {
            type: String,
        },
        thirdSkill: {
            type: String,
        },
        likeCount: {
            type: Number,
            default: 0
        },
        dislikeCount: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;