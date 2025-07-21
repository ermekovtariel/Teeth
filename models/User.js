const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  avatarUrl: { type: String },
  name: { type: String, default: null },
  surname: { type: String, default: null },
  city: { type: String, default: null },
  birthday: { type: Date, default: null },
  about: { type: String, default: null },
  sex: { type: String, default: null },
  isOnline: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  verifiedBy: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
  company: { type: Types.ObjectId, ref: 'Company', default: null },
});

module.exports = model('User', schema);
