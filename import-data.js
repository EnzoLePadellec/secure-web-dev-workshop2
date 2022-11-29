//import mongoose from 'mongoose'; -> package.json => 'type' : 'module'
const mongoose =require('mongoose')
require('dotenv').config()

const { Schema } = mongoose;

const filmSchema = new Schema({
  filmType:  String,
  filmProducerName: String,
  endDate:   Date,
  filmName: String,
  district: String,
  geolocation:{
    coordinates:[Number],
    type: { type :String },
  },
  sourceLocationId: String,
  filmDirectorName: String,
  address: String,
  startDate: Date,
  year: Number,
});

const Location = mongoose.model("Location",filmSchema)

const filmingLocations = require('./lieux-de-tournage-a-paris.json')


function buildLocation(filmingLocation){
    return new Location({
        filmType: filmingLocation.fields.type_tournage,
        filmProducerName: filmingLocation.fields.nom_producteur,
        endDate: filmingLocation.fields.date_fin,
        filmName: filmingLocation.fields.nom_tournage,
        district: filmingLocation.fields.ardt_lieu,
        sourceLocationId: filmingLocation.fields.id_lieu,
        filmDirectorName: filmingLocation.fields.nom_realisateur,
        address: filmingLocation.fields.adresse_lieu,
        startDate: filmingLocation.fields.date_debut,
        year: filmingLocation.fields.annee_tournage,
        geolocation: filmingLocation.fields.geo_shape
    })
}

async function importBulkFilmingLocations(){
  const locationsArray = []
  for(const filmingLocation of filmingLocations){
    locationsArray.push(buildLocation(filmingLocation))
  }
  await Location.insertMany(locationsArray)
}

async function findOneByID(id)
{
  return Location.findOne({_id: id})
}

async function findAll(filmName){
  return Location.find({filmName})
}

async function deleteByID(id){
  Location.findOneAndDelete( {_id : id});
  console.log('Location supprimée !');
}

function addLocation(location){
  location.save();
  console.log('Location ajoutée !');
}

function updateLocation(id, update){
  Location.updateOne({ _id: id }, update);
  console.log('Location Mise à jour !')
}

async function main(){
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected !')
  //await importBulkFilmingLocations()
  console.log('Finished Importing !')

  const l1 = await findOneByID('6386910dfdf068883b36196c')
  console.log(l1)

  const l2 = await findAll('MARIE FRANCINE')
  console.log(l2)

  await deleteByID('6386910dfdf068883b36196f')

  const newLocation = new Location({filmType : "film",
        filmProducerName : "Producteur",
        endDate: new Date("11-11-2011"),
        filmName: "Nom du film",
        district: "75016",
        geolocation: [10.00000,10.00000],
        sourceLocationId : "141414",
        filmDirectorName: "Nom du directeur",
        address: "Adresse",
        startDate: new Date("11-11-2001"),
        year: parseInt("2001")})
  await addLocation(newLocation);

  const miseAJour = {$set: {filmName: 'Tintin au Pérou'}};
  await updateLocation('6386910dfdf068883b36196c', miseAJour);

}

main()