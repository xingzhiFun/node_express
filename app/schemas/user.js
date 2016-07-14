//引入建模工具模块mongoose
var mongoose=require('mongoose');
//专门针对密码存储设计的算法，引入库
var bcrypt=require('bcrypt');
var SALT_WORK_FACTORY=10;
//申明UserSchema调用Schema方法，申明变量
var UserSchema=new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

//为模式添加方法
// 每次存数据之前都调用这个方法
UserSchema.pre('save',function(next){
	var user=this;
	//判断是否为新增的数据
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt=Date.now();
	}

	bcrypt.genSalt(SALT_WORK_FACTORY,function(err,salt){
		if(err) return next(err);

		bcrypt.hash(user.password,salt,function(err,hash){
			if(err) return next(err);
			user.password = hash;
			next();
		})
	})
})

//增加实例方法
UserSchema.methods = {
	comparePassword: function(_password, cb) {
	  	var user = this;
	    bcrypt.compare(_password, user.password, function(err, isMatch) {
		    if (err){
			    console.log(err);
			    return cb(err)
		    }

		    console.log(_password+user.password);
		    cb(null, isMatch);
		})
	}
}

//增加一些静态方法 不会直接与数据库交互，只有经过model模型实例化编译以后才会有这些方法
UserSchema.statics={
	fetch:function(cb){
		return this
		//取出数据库所有的数据
		.find({})
		//按照更新时间排序
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		//查询单条数据
		.findOne({_id:id})
		.exec(cb)
	}
}

//模式导出
module.exports=UserSchema


