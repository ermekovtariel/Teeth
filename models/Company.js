const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: String, default: '' },
});

module.exports = model('Company', schema);
