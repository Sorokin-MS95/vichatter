module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch : {
			scripts: {
				files : 'app/public/css/styles.scss',
				tasks : ['sass']
			}
		},
		sass :  {
			dist: {
				files: {
					'app/public/css/styles.css' : 'app/public/css/styles.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.registerTask('default', ['watch']);
}