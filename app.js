// 引入依赖
var express = require('express');
var path=require('path');
var mongoose=require('mongoose');
var dbUrl='mongodb://localhost/imooc';
// 设置默认端口
var port = process.env.PORT || 3000;
//启动web服务器
var app=express();

mongoose.connect(dbUrl);

//设置视图的根目录
app.set('views','./app/views/pages');
//设置默认模版引擎
app.set('view engine','jade');
//
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
// cookie
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore=require('connect-mongo')(session);
app.use(cookieParser());
app.use(session({
    secret: 'daceyu.com',
    //session持久化
    store:new mongoStore({
    	url :dbUrl,
        collection: 'sessions'
    }),
    resave:false,
    saveUninitialized:true
}));

// 做配置
var logger = require('morgan');
if('development' === app.get('env')){
	//app.get('env')拿到环境变量,测试环境下可以做以下配置
	app.set('showStaticError',true);//提示报错
	app.use(logger(':method :url :status'));//
	app.locals.pretty = true;//代码显示为压缩
	mongoose.set('debug',true);//database
}

require('./config/routes')(app);

//静态资源的获取,设置静态文件目录  _dirname:当前目录
app.use(express.static(path.join(__dirname,'public')))
//
app.locals.moment=require('moment');
//监听端口
app.listen(port);
console.log(' movieProject started on port ' + port);




