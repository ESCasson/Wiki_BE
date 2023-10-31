const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionTextSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  sectionID: {
    type: String,
    required: true
  },
  sectionHTML: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const SectionText = mongoose.model('SectionText', sectionTextSchema);
module.exports = { SectionText, sectionTextSchema };
