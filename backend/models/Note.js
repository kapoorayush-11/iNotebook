// Iske andar banaye jaayenge mongoose ke models.. dono schemas

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    user:{
    // Why I am making it. Because mei chahta hu ki ek bande ke notes dusre ko naa dikhe. Toh iske through user ko mei yaha store kr skta.    
    type: mongoose.Schema.Types.ObjectId,
    ref:'user' // Jo Schema ha User.js uske last mei jo mongoose.model mei jo user hai vo
    },

    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true,
    },


    tag:{
        type: String,
        default: "General"
    },

    date:{
        type: Date,
        default: Date.now
    },
 
  });

  module.exports = mongoose.model('notes',NotesSchema);


