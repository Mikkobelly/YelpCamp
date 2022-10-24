const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/review');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router;