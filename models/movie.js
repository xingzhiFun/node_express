//加载moogoose工具模块
var mongoose =require('mongoose');
//引入模式文件，拿到导出的模块
var MovieSchema=require('../schemas/movie');
//编译生成movie这个模型
var Movie= mongoose.model('Movie',MovieSchema);

module.exports=Movie