import express from 'express';
const restaurantRouter = express.Router();

import {
  createRestaurant,
  readRestaurant,
  readAllRestaurants,
  readRestaurantsByCuisine,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantsByLocation,
  filterRestaurantsByRating,
  addDishToMenu,
  removeDishFromMenu,
  addRestaurantReviewAndRating,
  getUserReviewsForRestaurant
} from "../controllers/restaurant.controller.js";

const errorHandler = (fn) => (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
  
restaurantRouter.post('/', errorHandler(async (req, res) => {
  const savedRestaurant = await createRestaurant(req.body);
  if (savedRestaurant) {
    res.status(201).json({ message: `Restaurant "${savedRestaurant.name}" created successfully.`, restaurant: savedRestaurant });
  } else {
    res.status(500).json({ error: 'Failed to create restaurant.' });
  }
}));

restaurantRouter.get('/search', errorHandler(async (req, res) => {
  const location = req.query.location;
  const savedRestaurants = await searchRestaurantsByLocation(location);
  if (savedRestaurants.length > 0) {
    res.status(200).json({ message: `Restaurants in location "${location}" found.`, restaurants: savedRestaurants });
  } else {
    res.status(404).json({ message: `No restaurants found in location "${location}".` });
  }
}));


restaurantRouter.get('/:name', errorHandler(async (req, res) => {
  const restaurantName = req.params.name;
  const savedRestaurant = await readRestaurant(restaurantName);
  if (savedRestaurant) {
    res.status(200).json({ message: 'Restaurant found.', restaurant: savedRestaurant });
  } else {
    res.status(404).json({ error: 'Restaurant not found.' });
  }
}));


restaurantRouter.get('/', errorHandler(async (req, res) => {
  const savedRestaurants = await readAllRestaurants();
  if (savedRestaurants) {
    res.status(200).json({ message: 'All restaurants retrieved successfully.', restaurants: savedRestaurants });
  } else {
    res.status(404).json({ error: 'No restaurants found.' });
  }
}));

restaurantRouter.get('/cuisine/:cuisineType', errorHandler(async (req, res) => {
  const cuisineType = req.params.cuisineType;
  const savedRestaurants = await readRestaurantsByCuisine(cuisineType);
  if (savedRestaurants.length > 0) {
    res.status(200).json({ message: `Restaurants with cuisine "${cuisineType}" found.`, restaurants: savedRestaurants });
  } else {
    res.status(404).json({ message: `No restaurants found with cuisine "${cuisineType}".` });
  }
}));

restaurantRouter.post('/:restaurantId', errorHandler(async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const updatedRestaurantData = req.body;
  const updatedRestaurant = await updateRestaurant(restaurantId, updatedRestaurantData);
  if (updatedRestaurant) {
    res.status(200).json({ message: `Restaurant "${updatedRestaurant.name}" updated successfully.`, restaurant: updatedRestaurant });
  } else {
    res.status(404).json({ error: `Restaurant not found or update failed.` });
  }
}));

restaurantRouter.delete('/:restaurantId', errorHandler(async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const deletedRestaurant = await deleteRestaurant(restaurantId);
  if (deletedRestaurant) {
    res.status(200).json({ message: `Restaurant "${deletedRestaurant.name}" deleted successfully.`, restaurant: deletedRestaurant });
  } else {
    res.status(404).json({ error: `Restaurant not found or delete failed.` });
  }
}));



restaurantRouter.get('/rating/:minRating', errorHandler(async (req, res) => {
  const minRating = req.params.minRating;
  const savedRestaurants = await filterRestaurantsByRating(minRating);
  if (savedRestaurants.length > 0) {
    res.status(200).json({ message: `Restaurants with rating ${minRating} and above found.`, restaurants: savedRestaurants });
  } else {
    res.status(404).json({ message: `No restaurants found with rating ${minRating} and above.` });
  }
}));

restaurantRouter.post('/:restaurantId/menu', errorHandler(async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const updatedRestaurantMenu = await addDishToMenu(restaurantId, req.body);
  if (updatedRestaurantMenu) {
    res.status(200).json({ message: 'Dish added to the menu successfully.', restaurant: updatedRestaurantMenu });
  } else {
    res.status(404).json({ error: 'Restaurant not found or adding dish to menu failed.' });
  }
}));

restaurantRouter.delete('/:restaurantId/menu/:dishName', errorHandler(async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const dishName = req.params.dishName;
  const updatedRestaurant = await removeDishFromMenu(restaurantId, dishName);
  if (updatedRestaurant) {
    res.status(200).json({ message: `Dish "${dishName}" removed from the menu successfully.`, restaurant: updatedRestaurant });
  } else {
    res.status(404).json({ error: 'Restaurant not found or removing dish from menu failed.' });
  }
}));

restaurantRouter.post('/:restaurantId/reviews', errorHandler(async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const { userId, reviewText, rating } = req.body;
  const updatedRestaurant = await addRestaurantReviewAndRating(restaurantId, userId, reviewText, rating);
  if (updatedRestaurant) {
    res.status(200).json({ message: 'Review added successfully.', restaurant: updatedRestaurant });
  } else {
    res.status(404).json({ error: 'Restaurant not found or adding review failed.' });
  }
}));

restaurantRouter.get('/:restaurantId/reviews', errorHandler(async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const restaurantWithAllUserReviews = await getUserReviewsForRestaurant(restaurantId);
  if (restaurantWithAllUserReviews) {
    res.status(200).json({ message: 'User reviews retrieved successfully.', reviews: restaurantWithAllUserReviews });
  } else {
    res.status(404).json({ error: 'Restaurant not found or retrieving reviews failed.' });
  }
}));

export default restaurantRouter;
