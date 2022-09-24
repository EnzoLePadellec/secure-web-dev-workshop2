require('dotenv').config()
console.log(process.env)

import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  filmType:  String, // String is shorthand for {type: String}
  filmProducerName: String,
  endDate:   Date,
  filmName: String,
  district: String,
  geolocation:{
    coordinates:[{x: Number,y: Number}],
    type: String,
  },
  sourceLocationId: String,
  filmDirectorName: String,
  address: String,
  startDate: Date,
  year: Date.year,
});