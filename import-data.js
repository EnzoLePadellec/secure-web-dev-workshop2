require('dotenv').config()
console.log(process.env)

//import mongoose from 'mongoose'; -> package.json => 'type' : 'module'
const mongoose =require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Connected !")})
//moongoose.connect(param:2).then(()=>result)
//équivalent const result = await moongoose.connect(param1)

console.log("Toto")

const { Schema } = mongoose;

const blogSchema = new Schema({
  filmType:  String,
  filmProducerName: String,
  endDate:   Date,
  filmName: String,
  district: String,
  geolocation:{
    coordinates:[Number],
    type: String,
  },
  sourceLocationId: String,
  filmDirectorName: String,
  address: String,
  startDate: Date,
  year: Number,
});

//const Location = new Model('Location',locationSchema)
//const maPremiereLocation = new Location({filmType:'Horror'})
//await maPremiereLocation.save()



async function main(){
  //const result = await mongoose.connect(1)
  //console.log(result)
  //const result2 = await mongoose.connect(2)
  //console.log(result2)
  //const connections = await Promise.all([mongoose.connect(1), mongoose.connect(2)])
}

//main()
//fonction async, promises et call back