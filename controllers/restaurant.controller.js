import Restaurant from "../models/restaurant.model.js";

export const createRestaurant = async (restaurantData) => {
  try {
    const newRestaurant = await Restaurant.create(restaurantData);
    return newRestaurant;
  } catch (error) {
    throw new Error("Failed to create a new restaurant. Please try again later.");
  }
};

export const readRestaurant = async (name) => {
  try {
    const restaurant = await Restaurant.findOne({ name });
    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }
    return restaurant;
  } catch (error) {
    throw new Error("Failed to retrieve the restaurant. Please try again later.");
  }
};

export const readAllRestaurants = async () => {
  try {
    const restaurants = await Restaurant.find();
    return restaurants;
  } catch (error) {
    throw new Error("Failed to retrieve restaurants. Please try again later.");
  }
};

export const readRestaurantsByCuisine = async (cuisineType) => {
  try {
    const restaurants = await Restaurant.find({ cuisine: cuisineType });
    return restaurants;
  } catch (error) {
    throw new Error("Failed to retrieve restaurants by cuisine. Please try again later.");
  }
};

export const updateRestaurant = async (id, updatedData) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
    if (!updatedRestaurant) {
      throw new Error("Restaurant not found or could not be updated.");
    }
    return updatedRestaurant;
  } catch (error) {
    throw new Error("Failed to update the restaurant. Please try again later.");
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      throw new Error("Restaurant not found or could not be deleted.");
    }
    return deletedRestaurant;
  } catch (error) {
    throw new Error("Failed to delete the restaurant. Please try again later.");
  }
};

export const searchRestaurantsByLocation = async (location) => {
  try {
    const restaurants = await Restaurant.find({ city:location });
    return restaurants;
  } catch (error) {
    throw new Error("Failed to search for restaurants by location. Please try again later.");
  }
};

export const filterRestaurantsByRating = async (minRating) => {
  try {
    const restaurants = await Restaurant.find({ rating: { $gte: minRating } });
    return restaurants;
  } catch (error) {
    throw new Error("Failed to filter restaurants by rating. Please try again later.");
  }
};

export const addDishToMenu = async (restaurantId, newDishData) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }
    restaurant.menu.push(newDishData);
    await restaurant.save();
    return restaurant;
  } catch (error) {
    throw new Error("Failed to add a new dish to the menu. Please try again later.");
  }
};

export const removeDishFromMenu = async (restaurantId, dishName) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }
    restaurant.menu = restaurant.menu.filter((menu) => menu.name.toLowerCase()!== dishName.toLowerCase());
   return await restaurant.save();
  } catch (error) {
    throw new Error("Failed to remove the dish from the menu. Please try again later.");
  }
};

export const addRestaurantReviewAndRating = async (
  restaurantId,
  userId,
  reviewText,
  rating
) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }
    const userReview = {
      user: userId,
      text: reviewText,
      rating: rating,
    };
    restaurant.reviews.push(userReview);
    await restaurant.save();
    const restaurantWithUserReview = await Restaurant.findById(restaurantId).populate(
      'reviews.user',
      'profilePictureURL username'
    );
    return restaurantWithUserReview;
  } catch (error) {
    throw new Error("Failed to add a review and rating. Please try again later.",error);
  }
};

export const getUserReviewsForRestaurant = async (restaurantId) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: 'reviews',
      populate: {
        path: "user",
        select: 'username profilePictureURL email'
      },
    });
    const reviewsWithUserDetails = restaurant.reviews.map(review => ({
      reviewText: review.text,
      rating: review.rating,
      user: review.user,
    }));
    return reviewsWithUserDetails;
  } catch (error) {
    throw new Error("Failed to retrieve user reviews for the restaurant. Please try again later.");
  }
};
