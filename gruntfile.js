module.exports = function(grunt){

	//默认任务
	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options:{
					//重新启动服务
					livereload:true
				}
			},
			js:{
				files:['public/js/**','models/**/*.js','schemas/**/*.js'],
				//js语法检查
				//tasks:['jshint'],
				options:{
					livereload:true
				}
			}
		},

		nodemon:{
			dev:{
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_moudles/**','.DS_Store'],
					watchedExtensions:['js'],
					wacthedFolders:['app','config'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000
					},
					cwd:__dirname
				}
			}
		},

		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		}
	})

	//文件变动就会重新执行你写好的任务
	grunt.loadNpmTasks('grunt-contrib-watch');
	//实时监听app.js
	grunt.loadNpmTasks('grunt-nodemon');
	//针对慢任务(sass,less...)开发的插件
	grunt.loadNpmTasks('grunt-concurrent');

	//避免因为语法错误或警告而中断grunt服务
	grunt.option('force',true);
	//注册一个默认的任务
	grunt.registerTask('default',['concurrent']);

}


