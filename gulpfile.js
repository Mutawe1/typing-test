var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat= require('gulp-concat');
var karma=  require('karma').server;

gulp.task("html", function () {
    gulp.src("app/src/*.html")
});

gulp.task("webserver", function (){
    gulp.src("app/build").pipe(webserver({
        livereload: true,
        open: true
    }));
});


gulp.task("concat", function(){
    gulp.src(["app/src/app.js", "app/src/components/**/*.js", "app/src/shared/**/*.js"])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('app/src'));    
});


gulp.task("copy", function() {
    gulp.src(["app/src/script.js" , 'app/src/assets/**/**/*', 'app/src/index.html', 'app/src/**/*.html'], {base:'app/src'})
    .pipe(gulp.dest("app/build"));
});

gulp.task("test", function(done){
    //console.log(__dirname);
     karma.start({ configFile: __dirname + '/karma.conf.js',
                singleRun: true}, done);
    
});



gulp.task("default", ["webserver", "html", "concat", "copy"]);
gulp.task("build", ["concat", "copy"]);
//gulp.task("test", ['test']);