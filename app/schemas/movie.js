//引入建模工具模块mongoose
var mongoose=require('mongoose');
//申明movieSchema调用Schema方法，申明变量
var MovieSchema=new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
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
MovieSchema.pre('save',function(next){
	//判断是否为新增的数据
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt=Date.now();
	}
	next();
})

//增加一些静态方法 不会直接与数据库交互，只有经过model模型实例化编译以后才会有这些方法
MovieSchema.statics={
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
module.exports=MovieSchema


