//包装函数
module.exports=function  (grunt) {
	//获取package.json的信息
	grunt.initConfig({
		pkg:grunt.file.readJSON("package.json"),
		//uglify插件信息
		uglify:{
			options:{
				stripBanners:true,
				banner:'/*!<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build:{
				files:[{
					expand: true,
                    cwd: 'src/js/',
                    src: ['*.js'],
                    dest: 'build/src/js/',
                    extDot: 'last',
                    ext:'.min.js'
				}]
			}
		},
		jshint:{
			build:'src/js/index.js',
			options:{
				jshintrc:'.jshintrc',
			}
		},
		cssmin: {
			/*options: {
    		shorthandCompacting: false,
   		 	roundingPrecision: -1
  			},
  			build: {
   				 files: {
      				'src/css/index.min.css': ['src/css/main.css', 'src/css/test.css']
   				 }
  			},
  			*/
			target: {
    			files: [{
      				expand: true,
      				cwd: 'src/css',
     				src: ['*.css', '!*.min.css'],
     				dest: 'build/src/css/',
     				ext: '.min.css'
    			}]
  			},
  			
		},
		copy:{
			build:{
				src:['src/image/*','src/*.html','src/fonts/*'],
				dest:'build/',
			},
		},
		sass:{
			build:{
				files:{
					'src/css/main.css':'src/css/main.scss'
				}
			}
		},
		watch:{
			build:{
				files:['src/*/*.js','src/*/*.scss','src/*.html'],
				tasks:['jshint','copy','uglify','sass','cssmin'],
				options:{spawn:false}
			}
		},
		
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default',['jshint','copy','uglify','sass','cssmin','watch']);
};