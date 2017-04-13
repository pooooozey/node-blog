var express = require('express');
var router = express.Router();

var Category = require('../models/Category');
var Content = require('../models/Content');

router.get('/',function(req,res,next){

	Category.find().then(function(categories){
		res.render('main/index',{
			userInfo : req.userInfo,
			categories : categories
		});
	});
});

router.post('/content',function(req,res,next){
	var page = Number(req.body.page || 1);
    var limit = 2;
    var pages = 0;
    var responseData = null;

    Content.count().then(function(count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min( page, pages );
        //取值不能小于1
        page = Math.max( page, 1 );

        var skip = (page - 1) * limit;

        Content.find().limit(limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        }).then(function(contents) {
        	responseData = {
                contents: contents,
                navName : 'content',
                count: count,
                pages: pages,
                limit: limit,
                page: page
            };
            
            res.json(responseData);
			return;
        });

    });
});


module.exports = router;

