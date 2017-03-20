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


    router.delete('/delete',function(req, res,next) {
            var newAr=[];
               var newArr=req.body;
        console.log(req.body);
        for(i=0;i<newArr.length;i++){   
           console.log(newArr.length +"&&&"+i+newArr[i]._id);
        Post.remove({ _id: newArr[i]._id}, function(err, post) {
               if(err){ return res.send('Something wrong idiot!!') }
        });
            
        }
        res.send('Del');
    });

router.put('/posts/:id', function(req, res,next) {
    Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});