var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();


gulp.task('default', ['es5', 'commonjs']);




gulp.task('es5', ['clean', 'lint'],  function () {

    return gulp.src('es6/init.js')
    	.pipe($.es6ModuleTranspiler({
            formatter: 'bundle'
        }))
        .pipe( $.babel() )
    	.pipe($.flatten())
		.pipe( $.rename(function(path){ path.basename = path.basename.replace('init', 'element-state-manager'); }) )
        .pipe( gulp.dest('es5') )
        .pipe( $.uglify() )
        .pipe( $.rename(function(path){ path.basename+=".min"; }) )
        .pipe( gulp.dest('es5'));

});



gulp.task('commonjs', ['clean', 'lint'],  function () {

    return gulp.src('es6/*.js')
    	.pipe( $.babel() )
		// .pipe( $.rename(function(path){ path.basename = 'element-state-manager.' + path.basename.replace('.build', ''); }) )
        .pipe( gulp.dest('commonjs') );

});


gulp.task('lint', function(){
	return gulp.src('es6/*.js')
    	.pipe( $.jshint() )
 		.pipe( $.jshint.reporter('default') )
    	.pipe( $.jshint.reporter('fail') );
});

gulp.task('clean', function(){
	return gulp.src(['es5', 'commonjs'], {read: false})
        .pipe($.clean());
});
