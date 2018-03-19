'use strict';

const gulp=require('gulp');
const nodemon = require('gulp-nodemon');
let sync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV=='development';



function lazyRequireTask(taskName,path,options){
  options = options || {};
  options.taskName=taskName;
  gulp.task(taskName,function(callback){
    let task=require(path).call(this,options);
    return task(callback);
  });
}

lazyRequireTask('app','./tasks/app');

lazyRequireTask('clean','./tasks/clean',{src:'public/**/*.*'});

lazyRequireTask('asserts','./tasks/asserts',{ from:'front/src/**/*.{html,json}',base:'public',dst:'public'});

lazyRequireTask('styles','./tasks/styles',{ from:'front/src/**/*.less',dst:'public/css'});

lazyRequireTask('picture:asserts','./tasks/picture-asserts',{ from:'front/src/**/*.{png,svg,jpg}',dst:'public/img'});

lazyRequireTask('watch','./tasks/watch',{ 
  objForWatch : [
  {path:'./front/src/**/*.html',  task:'asserts'},
  {path:'./front/src/**/*.less', task:'styles'}
  ] 
});

lazyRequireTask('webpack','./tasks/webpack');

gulp.task('browser-sync', function() {
    sync.init(null, {
        proxy: "localhost:3000",
        port:7000
    });
  
  sync.watch('public/**/*.*').on('change',sync.reload);
});





gulp.task('server',gulp.series('app','browser-sync'));


gulp.task('build',gulp.series('clean','webpack', gulp.parallel('asserts','styles','picture:asserts')));


gulp.task('dev', gulp.series('build',gulp.parallel('server','watch')));

gulp.task('default', gulp.series('build','server'));
