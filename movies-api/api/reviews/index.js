import express from 'express';
import Review from './reviewModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

router.get('/movie/:movieId', async (req, res) => {
  const movieId = Number(req.params.movieId);
  const reviews = await Review.findByMovie(movieId);
  res.status(200).json(reviews);
});

router.get('/user', asyncHandler(async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, msg: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    const reviews = await Review.findByUsername(decoded.username);
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, msg: 'Invalid token.' });
  }
}));

router.post('/', asyncHandler(async (req, res) => {
  try {
    const authHeader = req.headersauthorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, msg: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    if (!req.body.movieId || !req.body.author || !req.body.content || !req.body.rating) {
      return res.status(400).json({
        success: false,
        msg: 'movieId, author, content and rating are required.',
      });
    }

    const review = await Review.create({
      movieId: req.body.movieId,
      username: decoded.username,
      author: req.body.author,
      content: req.body.content,
      rating: req.body.rating,
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, msg: 'Invalid token.' });
  }
}));

router.put('/:id', asyncHandler(async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: 'Review not found.' });
    }

    if (review.username !== decoded.username) {
      return res.status(403).json({ msg: 'Not authorised.' });
    }

    review.content = req.body.content;
    review.rating = Number(req.body.rating);

    await review.save();

    res.status(200).json({ success: true, review });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Invalid token.' });
  }
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, msg: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, msg: 'Review not found.' });
    }

    if (review.username !== decoded.username) {
      return res.status(403).json({ success: false, msg: 'Not authorised to delete this review.' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: 'Review deleted.' });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, msg: 'Invalid token.' });
  }
}));

export default router;
