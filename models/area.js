const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const areaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sections: {
    type: [sectionSchema],
    required: true}
}, {
  timestamps: true
});

let Area = mongoose.model('Area', areaSchema);

module.exports = { Area, areaSchema };