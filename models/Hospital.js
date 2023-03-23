<<<<<<< HEAD
const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlenght:[50, 'Name can not be more than 50 characters']
    },
    address:{
        type: String,
        required: [true, 'Please add an address']
    },
    district:{
        type: String,
        required: [true,'Please add a district']
    },
    province:{
        type: String,
        required: [true,'Please add a province']
    },
    postalcode:{
        type: String,
        required: [true,'Please add a postalcode'],
        maxlenght:[5,'Postal Code can not be more than 5 digits']
    },
    tel:{
        type: String
    },
    region:{
        type: String,
        required: [true, 'Please add a region']
    }
},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

HospitalSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField:'hospital',
    justOne:false
});

//Cascade del
HospitalSchema.pre('remove', async function(next){
    console.log(`Appointments being removed from hospital ${this._id}`);
    await this.model('Appointment').deleteMany({hospital:this._id});
    next();
});

=======
const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlenght:[50, 'Name can not be more than 50 characters']
    },
    address:{
        type: String,
        required: [true, 'Please add an address']
    },
    district:{
        type: String,
        required: [true,'Please add a district']
    },
    province:{
        type: String,
        required: [true,'Please add a province']
    },
    postalcode:{
        type: String,
        required: [true,'Please add a postalcode'],
        maxlenght:[5,'Postal Code can not be more than 5 digits']
    },
    tel:{
        type: String
    },
    region:{
        type: String,
        required: [true, 'Please add a region']
    }
},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

HospitalSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField:'hospital',
    justOne:false
});

//Cascade del
HospitalSchema.pre('remove', async function(next){
    console.log(`Appointments being removed from hospital ${this._id}`);
    await this.model('Appointment').deleteMany({hospital:this._id});
    next();
});

>>>>>>> d572376904e0c290b859dd118f96ffdf2f07e588
module.exports=mongoose.model('Hospital', HospitalSchema);