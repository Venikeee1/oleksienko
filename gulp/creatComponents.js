const fs = require('fs');
const file = require('gulp-file');
const inject = require('gulp-inject-string');
const gulp = require('gulp');
const createMod = require('./functions/functions');


//console.log(createModule)

module.exports = function () {
    //console.log(createModule)
    return function () {
       
        let componentName = process.argv[3].replace('--','') || 'component';    
        let componentPath = `source/handlebars/pages/${componentName}`;
        let htmlPath = `source/pages/`;
            

        if (fs.existsSync(componentPath)) {
            throw new Error('The file allready exist');
        }

        appendToMainScss(componentName);

        createHTML(componentName, htmlPath);

        return createMod( componentName, componentPath );
      

       
        
    };
};

function createModule(name, path) {

            file(`${name}.js`, `${name}: {}`, { src: true })
                .pipe(gulp.dest(`${path}/data/`));

            file(`${name}.scss`, `.${name} {\n}`, { src: true })
                .pipe(gulp.dest(path));
         
            return file(`${name}.hbs`, '', { src: true })
                .pipe(gulp.dest(path));
        }

        function createHTML( fileName, path) {

            const htmlText = `<!DOCTYPE html>
            <html>
            {{> component/head/head }}
            <body>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <div class="wrapper">
                    {{> pages/${fileName}/${fileName}}}
                </div>
                {{> component/scripts/scripts}}
            </body>
        </html>

         `;

            file(`${fileName}.html`, htmlText, { src: true })
                .pipe(gulp.dest(`${path}`));
        }

        function appendToMainScss(elemScsssName) {

            let componentSCSS = `@import "..heandlebars/pages/${elemScsssName}/${elemScsssName}.scss";`;

            gulp.src(`source/sass/main.scss`)
                .pipe(inject.append(`\n${componentSCSS}`))
                .pipe(gulp.dest(`source/sass/`));
        }

