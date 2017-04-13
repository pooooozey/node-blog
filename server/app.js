var express = require('express');
var app = express();
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var User = require('./models/User');
var ueditor = require('ueditor');
var path = require('path');


//设置静态文件托管
//url中以/public开始则返回此目录下文件
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(__dirname + '/public'));


//配置应用模板

//定义当前应用使用的模板引擎
//第一个参数：模板引擎的名称，也是文件后缀，可以自定义
//第二个参数：用于解析处理模板内容的方法
app.engine('html',swig.renderFile);

//设置模板文件存放目录,第一个参数不能改变，第二个是路径
app.set('views','./views');

//注册模板引擎
//第一个参数必须是view engine,第二个参数必须和前面定义的引擎名称一致
app.set('view engine','html');

//性能上考虑会缓存模板,修改内容后再次访问需要重启服务器
//开发时，取消模板缓存
swig.setDefaults({
	cache:false
});

//body-parser设置
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json());

//设置cookie
app.use(function(req,res,next){
	req.cookies = new Cookies(req,res);

	//解析用户cookie信息
	req.userInfo = {};
	if(req.cookies.get('userInfo')){
		//检查请求头里是否有已登录的用户信息
		try{
			req.userInfo = JSON.parse(req.cookies.get('userInfo'));

			User.findById(req.userInfo._id).then(function(userInfo){
				req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
				next();
			});

		}catch(e){
			console.log('cookies err:'+e)
		}
	}else{
		next();
	}
});

//跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});



//ueditor
app.use("/admin/libs/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {

    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/admin/update';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }

    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/admin/update';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }

    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/admin/libs/ueditor/nodejs/config.json')
    }

}));
//根据不同功能划分模块
app.use('/cms',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


mongoose.connect('mongodb://localhost:27017/blog',function(err){
	if(err){
		console.log('数据库连接失败');
	}else{
		console.log('数据库连接成功');
		app.listen(8080);
	}
});

