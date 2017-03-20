var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  todo: String,
    done : { type: Boolean, default: false }
});

mongoose.model('Post', PostSchema);