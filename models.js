"use strict";

const mongoose = require("mongoose");

// this is our schema to represent a post
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  author {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  }
  content: { type: String, required: true }
});

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// creates a virtual (calculated) field from the author object
postSchema.virtual("fullName").get(function() {
  return `${this.author.firstname} ${this.author.lastname}`.trim();
});

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
postSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.fullName
  };
};

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
