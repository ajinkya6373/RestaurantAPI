import mongoose from "mongoose";

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    cuisine: {
        type: String,
        required: [true, 'Cuisine is required.'],
    },
    address: {
        type: String,
        required: [true, 'Address is required.'],
    },
    city: {
        type: String,
        required: [true, 'City is required.'],
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    menu: [
        {
            name: String,
            price: Number,
            description: String,
            isVeg: Boolean,
        }
    ],
    averageRating: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            text: {
                type: String,
                required: [true, 'Review text is required.'],
            },
            rating: {
                type: Number,
                required: [true, 'Review rating is required.'],
            },
        }
    ],
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
