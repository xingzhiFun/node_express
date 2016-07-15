var Index=require('../app/controllers/index');
var User=require('../app/controllers/user');
var Movie=require('../app/controllers/movie');

module.exports = function(app){

	//prev handle user
	app.use(function(req,res,next){
		var _user=req.session.user;
		app.locals.user = _user;
		next();
	})

	app.get('/',Index.index)

	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)
	app.get('/logout',User.logout)
	app.get('/signin',User.showSignin)
	app.get('/signup',User.showSignup)
	app.get('/admin/userList',User.signinRequired,User.adminRequired,User.list)

	app.get('/movie/:id',Movie.detail)
	app.get('/admin/movie',Movie.new)
	app.get('/admin/update/:id',Movie.update)
	app.post('/admin/movie/new',Movie.save)
	app.get('/admin/list',Movie.list)
	app.delete('/admin/list',Movie.del)

}