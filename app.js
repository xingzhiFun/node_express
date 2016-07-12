// 引入依赖
var express = require('express');
var path=require('path');


var mongoose=require('mongoose');
var Movie=require('./models/movie');
var _=require('underscore');

// 设置默认端口
var port = process.env.PORT || 3000;
//启动web服务器
var app=express();

//
mongoose.connect('mongodb://localhost/imooc');



//设置视图的根目录
app.set('views','./views/pages');
//设置默认模版引擎
app.set('view engine','jade');
//
// app.use(express.bodyParser());
var bodyParser=require('body-parser');
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//静态资源的获取,设置静态文件目录  _dirname:当前目录
app.use(express.static(path.join(__dirname,'public')))
//
app.locals.moment=require('moment');
//监听端口
app.listen(port);
console.log(' movieProject started on port ' + port);

/*
*
*编写路由
*
*/

//index page
app.get('/',function(req,res){

	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'imooc movieProject',
			movies:movies
		})
	})

	
})


//detail page
app.get('/movie/:id',function(req,res){

	var id=req.params.id;
	Movie.findById(id,function(err,movie){
		res.render('detail',{
			title:'imooc'+movie.title,
			movie:movie
		})
	})

})

//admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'imooc movieProject admin',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})

//admin update movie
app.get('/admin/update/:id',function(req,res){
	var id=req.params.id;

	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'后台更新页',
				movie:movie
			})
		})
	}
})



//admin post movie
app.post('/admin/movie/new',function(req,res){
	var id=req.body.movie._id;
	var movieObj=req.body.movie;
	var _movie;
	if(id!='undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			_movie=_.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}

				res.redirect('/movie/'+movie._id);
			})
		})
	}else{
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})

		_movie.save(function(err,movie){
			if(err){
				console.log(err);
			}

			res.redirect('/movie/'+movie._id);
		})
	}
})


//list page
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('list',{
			title:'imooc movieProject list',
			movies:movies
		})
	})
})


//list delete movie
app.delete('/admin/list',function(req,res){
	var id=req.query.id;
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}else{
				res.json({success:1});
			}
		})
	}
})



