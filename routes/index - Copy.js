var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var mongoose = require('mongoose');

var Post = mongoose.model('Post');



//// predicate the router with a check and bail out when needed
//router.use(function (req, res, next,err) {
//    if(err){ return next(err); }
//    if(req.body.todo=="" || req.body.active.toLowerCase()!=="true"){
////  if (!req.headers['x-auth'])
//  res.send('hello, user!')
//  next()
//    }
//    else{
//          res.send('fuck you')
//          next()
//    }
//  
//})

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});
//
//router.use('/posts', function(req, res, next) {
//       var resDel={todo:''};
//  var post = new Post(resDel);
//  post.save(function(err, post){
//    if(err){ return next(err); }
//
//    res.json(post);
//  });
//    //next();
//});
router.post('/posts', function(req, res, next) {
    console.log(req.body);
  var post = new Post(req.body);
  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.param('todoid', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    router.delete('/delete/:todoid',function(req, res) {
               console.log(req.params.todoid);   
        
        Post.remove({ _id: req.params.todoid}, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });