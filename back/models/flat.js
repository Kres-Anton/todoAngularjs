let util=require('util');



let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    flatName: {
        type: String,
        unique: false,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    house: {
        type: Number,
        required: true
    },
    flat: {
        type: Number,
        required: false
    },
    people: {
        type: Number,
        required: true,
        default:0
    },
    created: {
        type: Date,
        default: Date.now
    },
    square:{
        type:Number,
        required:true,
        default:0
    },
    ownerId:{
      type:String,
      required:true,
      default:""
    }
});


exports.User = mongoose.model('Flat', schema);
