var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Content = require('../models/Content');
var Category = require('../models/Category');

//统一返回格式
var responseData;

router.use(function(req,res,next){
	responseData = {
		code : 0,
		message : ''
	};
	next();
});

//用户注册
//--注册逻辑
//--用户名密码不能为空，长度是否合法，用户名是否已存在
router.post('/user/register',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;

	if(username==''){
		responseData.code = 1;
		responseData.message = '用户名不能为空';
		res.json(responseData);
		return;
	}else if(username.length<4||username.length>10){
		responseData.code = 2;
		responseData.message = '用户名长度不能小于4大于10';
		res.json(responseData);
		return;
	}else if(password==''){
		responseData.code = 3;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}else if(password.length<4||password.length>10){
		responseData.code = 4;
		responseData.message = '密码长度不能小于4大于10';
		res.json(responseData);
		return;
	}

	//验证用户名是否已存在,需要操作数据库
	User.findOne({
		username : username
	}).then(function(userInfo){
		if(userInfo){
			//数据库中有记录
			responseData.code = 5;
			responseData.message = '用户名已存在';
			res.json(responseData);
			return;
		}else{
			//保存用户信息到数据库
			var user = new User({
				username : username,
				password : password
			});
			return user.save();
		}
	}).then(function(newUserInfo){
		responseData.message = '注册成功';
		res.json(responseData);
	});


	

});

//登录
router.post('/user/login',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	var code = req.body.code;

	if(username == ''||password == ''||code == ''){
		responseData.code = 1;
		responseData.message = '请输入内容';
		res.json(responseData);
		return;
	}
	
	//从数据库中查询用户名和密码
	User.findOne({
		username : username,
		password : password
	}).then(function(userInfo){
		if(!userInfo){
			responseData.code = 1;
			responseData.message = '用户名或密码错误';
			res.json(responseData);
			return;
		}
		// else if(code!=''){

		// }
		else{
			//登录成功
			responseData.message = '登录成功';
			responseData.userInfo = {
				_id:userInfo._id,
				username:userInfo.username
			};
			req.cookies.set('userInfo',JSON.stringify({
				_id:userInfo._id,
				username:userInfo.username
			}));
			res.json(responseData);
			return;
		}
	});

});

//获取导航
router.post('/getNav', function(req, res) {

    var responseData = {
        code : -1,
        message : ''
    };

    Category.count().then(function(count) {
        
        /*
        * 1: 升序
        * -1: 降序
        * */
        Category.find().sort({_id: -1}).then(function(categories) {
        	responseData.code = 0;
            responseData.message = "ok";
            responseData.res = {
                categories: categories,
                count: count
            }
            res.json(responseData);
			return;
        });

    });

});

//获取内容列表
router.post('/getList',function(req,res,next){
    var page = Number(req.body.page||1);
    var limit = Number(req.body.limit||10);
    var pages = 0;
    var responseData = {
        code : -1,
        message : ''
    };
    var where = {};
    
    if (req.body.whereId) {
        where.category = req.body.whereId || '';
    }
    Content.count().then(function(count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min( page, pages );
        //取值不能小于1
        page = Math.max( page, 1 );

        var skip = (page - 1) * limit;

        Content.where(where).find().limit(limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        }).then(function(contents) {
            responseData.code = 0;
            responseData.message = "ok";
            responseData.res = {
                contents: contents,
                count: count,
                pages: pages,
                limit: limit,
                page: page
            }
            res.json(responseData);
			return;
        });

    });

});

//获取指定内容
router.post('/contentDetail', function(req, res, next) {
	var responseData = {
        code : -1,
        message : ''
    };
    var id = req.body.id||'';

    var contents = [];

    Content.findOne({
        _id: id
    }).then(function(content) {
        if (!content) {
        	responseData.code = -1;
        	responseData.message = '指定内容不存在';
            res.json(responseData);
            
            
        } else {
        	responseData.code = 0;
            responseData.message = "ok";
        	responseData.res = {
        		content: content
        	};
            res.json(responseData);

        }
    });

});


module.exports = router;

