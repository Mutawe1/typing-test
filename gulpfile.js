var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task("html", function () {
    gulp.src("app/*.html")
});

gulp.task("webserver", function (){
    gulp.src("app").pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task("default", ["webserver", "html"]);