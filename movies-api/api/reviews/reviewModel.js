import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({

  movieId: {
    type: Number,
    required: true,
    index: true,
  },

  username: {
    type: String,
    required: true,
    index: true,
  },

  author: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
    minlength: 5,
  },


  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Get all reviews for a movie
ReviewSchema.statics.findByMovie = function (movieId) {
  return this.find({ movieId }).sort({ createdAt: -1 });
};

// Get all reviews by a user
ReviewSchema.statics.findByUsername = function (username) {
  return this.find({ username }).sort({ createdAt: -1 });
};

export default mongoose.model('Review', ReviewSchema);
