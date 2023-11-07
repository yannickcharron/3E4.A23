import mongoose from 'mongoose';

const planetSchema = mongoose.Schema({
    name: {type: String, unique:true, required: true},
    discoveredBy: {type: String, index: true},
    discoveryDate: Date,
    temperature: Number,
    satellites: [String],
    position: {
        x: {type: Number, min:-1000, max:1000, required:true},
        y: {type: Number, min:-1000, max:1000, required:true},
        z: {type: Number, min:-1000, max:1000, required:true}
    }
},{
    collection:'planets',
    strict:'throw',
    id:false
});

planetSchema.virtual('explorations', {
    ref: 'Exploration',
    localField: '_id', // La clé primaire du schéma actuel (Planet dans l'exemple) généralement _id
    foreignField : 'planet', //L'attribut qui contient le côté 1 de la relation
    justOne: false //Si collection ou list = false, sinon true
})


export default mongoose.model('Planet', planetSchema);