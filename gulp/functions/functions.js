const gulp = require('gulp');
const file = require('gulp-file');

module.exports = function (name, path) {

    file(`${name}.js`, `${name}: {}`, { src: true })
        .pipe(gulp.dest(`${path}/data/`));

    file(`${name}.scss`, `.${name} {\n}`, { src: true })
        .pipe(gulp.dest(path));
         
    return file(`${name}.hbs`, '', { src: true })
        .pipe(gulp.dest(path));
        
}

 

  /*  if (packages.fs.existsSync(componentPath)) {
       throw new Error('The file allready exist');
    }

    return createModule( componentName, componentPath )*/

    /* let componentName = 'component1';
    let componentPath = `${SOURCE}/${HANDLEBARS}/component/${componentName}`;
    createModule( componentName, componentPath );*/