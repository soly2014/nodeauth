
const mongoose = require('mongoose');

mongoose.connect('mongodb://soly2014:000000@ds229468.mlab.com:29468/mongo');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {
  console.log('connected')
});


const Schema = mongoose.Schema;

const userSchema = new Schema({

    name:  String,
    username: String,
    email: String,
    password: String,
    image_path: String

});  


var User = mongoose.model('User', userSchema);

module.exports =  User;




