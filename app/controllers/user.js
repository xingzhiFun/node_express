var User=require('../models/user');

//showSignin
exports.showSignin=function(req,res){
	res.render('signin',{
		title:'login'
	})
}

//showSignup
exports.showSignup=function(req,res){
	res.render('signup',{
		title:'logout'
	})
}

//signup
exports.signup=function(req,res){
	var _user=req.body.user;
	//或者这么拿  param跟req.body的区别   param是body,query,路由三种方式的封装
	// req.param('user')
	
	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user){
			return res.redirect('/signin');
		}else{
			var user=new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err);
				}

				res.redirect('/');
				console.log(user);
			})
		}
	})	
}

//signin
exports.signin=function(req,res){
	var _user=req.body.user;
	var name=_user.name;
	var password=_user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/signin');
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err);
			}
			if(isMatch){
				//获取登录状态
				req.session.user = user;
				return res.redirect('/');
			}
			else{
				console.log('Password is not matched');
				return res.redirect('/signin');
			}
		})
	})
}

//logout
exports.logout=function(req,res){
	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/');
}

//userList page
exports.list=function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err);
		}
		res.render('userList',{
			title:'userProject list',
			users:users
		})
	})
}

//midware for user
exports.signinRequired=function(req,res,next){
	var user=req.session.user;
	if(!user){
		return res.redirect('/signin');
	}
	next()
}

exports.adminRequired=function(req,res,next){
	var user=req.session.user;
	if(user.role <= 10){
		return res.redirect('/signin');
	}
	next()
}


