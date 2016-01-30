var pkg = require('./package.json');
var gulp = require('gulp');
var tap = require('gulp-tap');
var babel = require('gulp-babel');
var order = require('gulp-order');
var concat = require('gulp-concat');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build', function (done){
    var banner = [
        '/*!',
        ' * WeUI.js v<%= pkg.version %> (<%= pkg.homepage %>)',
        ' * Copyright <%= new Date().getFullYear() %>',
        ' * Licensed under the <%= pkg.license %> license',
        ' */',
        ''].join('\n');
    gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(tap(function (file){
            var content = file.contents.toString();
            content = content.replace('${version}', pkg.version);
            file.contents = new Buffer(content);
        }))
        .pipe(order([
            'weui.js',
            '*.js'
        ]))
        .pipe(concat('weui.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename(function (path){
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('default', ['build']);