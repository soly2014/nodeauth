
const mongoose = require('mongoose');

mongoose.connect('mongodb://soly2014:000000@ds229468.mlab.com:29468/mongo');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


//db.once('open', function() {
  const Schema = mongoose.Schema;

  const blogSchema = new Schema({

      title:  String,
      author: String,
      body:   String,
      comments: [{ body: String, date: Date }],
      date: { type: Date, default: Date.now },
      hidden: Boolean,
      meta: {
        votes: Number,
        favs:  Number
      }
  });  
  
  blogSchema.methods.getBlog = function () {
    var greeting = this.title
      ? "Meow name is " + this.author
      : "I don't have a name";
    return greeting;
  }

  var Blog = mongoose.model('Blog', blogSchema);
  module.exports =  Blog;



//});
