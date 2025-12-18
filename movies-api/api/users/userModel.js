import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// Compare password (login)
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Find user by username
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username });
};

UserSchema.pre('save', async function () {
  // Only hash if password is new or changed
  if (!this.isModified('password')) {
    return;
  }

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});


export default mongoose.model('User', UserSchema);
