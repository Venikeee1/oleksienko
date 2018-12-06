/**
 * Created by Eugene on 12.12.16.
 */

/** Constant's */
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const file = require('gulp-file');
const inject = require('gulp-inject-string');
const plugins = require('gulp-load-plugins')();
const rename = require("gulp-rename");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SOURCE = `source`;
const HANDLEBARS = `handlebars`;
const PAGES = `pages`;
const FONTS = `fonts`;
const MISC = `misc`;
const DEV = `dist`;
const CMS = `assets`;
const SCSS = `sass`;
const JS = `js`;
const SPRITE = `sprite`;
const SVG = `svg`;
const IMGS = `images`;
const VARIABLES = 'variables';
const VENDORS = `vendors`;
const STATIC__DEV = require('./gulp/frontendPath.js');
const STATIC__BUILD = require('./gulp/backendPath.js');
const STATIC__CMS = require('./gulp/backendPath.js');
const BUILD = `build`;


let DATE = new Date().toUTCString().replace(/[ :]+/g, '_').replace(/[TZtz,]+|_GM+|GM+/g, '');
let isBuild, cms = false;


const PARAMS = {
    hash: Math.random().toString(36).substring(7),
    src: {
        pages: `./${SOURCE}/${PAGES}`,
        misc: `./${SOURCE}/${MISC}`,
        handlebars: `./${SOURCE}/${HANDLEBARS}`,
        js: `${SOURCE}/${JS}`,
        sprite: `./${SOURCE}/${IMGS}/${SPRITE}`,
        styles: `${SOURCE}/${SCSS}`,
        fonts: `${SOURCE}/${FONTS}`,
        dev: `${DEV}`,
        imgs: `${SOURCE}/${IMGS}`
    },
    packages: {
        gulp: gulp,
        handlebars: require('gulp-compile-handlebars'),
        del: require('del'),
        path: require('path'),
        prettify: require('gulp-html-prettify'),
        chokidar: require('gulp-chokidar')(gulp),
        sourceMaps: require('gulp-sourcemaps'),
        babel: require('gulp-babel'),
        data: require('gulp-data'),
        scss: require('gulp-sass'),
        replace: require('gulp-replace-task'),
        iconFont: require('gulp-iconfont'),
        iconFontCss: require('gulp-iconfont-css'),
        concat: require('gulp-concat'),
        fs: require('fs'),
        spriteSmith: require('gulp.spritesmith'),
        named: require('vinyl-named'),
        gulpIf: require('gulp-if'),
        notify: require('gulp-notify'),
        uglify: require('gulp-uglify'),
        plumber: require('gulp-plumber'),
        browserSync: require('browser-sync'),
        webpackStream: webpackStream,
        webpack: webpackStream.webpack
    },
    commands: {
        clearAll: 'clear:all',
        moveMisc: 'move:misc',
        main: 'default',
        build: 'build',
        cms: 'cms',
        html: 'handlebars',
        css: 'scss',
        handlebarsData: 'handlebars:data',
        handlebarsClean: 'handlebars:clean',
        handlebarsCompile: 'handlebars:compile',
        sprite: 'sprite:create',
        watch: 'watch',
        js: 'es6',
        moveImgs: 'move:imgs',
        moveFonts: 'move:fonts',
        iconFont: 'iconfont',
        iconFontCss: 'iconfontCss',
        browse: 'browser',
        reload: 'browser:reload'
    }
};

const packages = PARAMS.packages;
const commands = PARAMS.commands;

/** Task for render html templates */


gulp.task(commands.handlebarsCompile, function(){
    var data, static, dist, hash, dataFields;

    dataFields = packages.fs.readFileSync( '.temp/partialsData.js', 'utf8' );

    if(isBuild === true){

        dist = `./${BUILD}s/`;
        hash = PARAMS.hash ;
        static = `${STATIC__BUILD.html}`;

    } else if (cms === true) {
        dist = `./${CMS}/`;
        hash = '';
        static = `${STATIC__CMS.html}`;

    } else {
        dist = `./${DEV}/`;
        hash = '';
        static = `${STATIC__DEV.html}`;
    }
    var options = {
        batch: [  PARAMS.src.handlebars ]
    };

    if (dataFields) {
        eval('data = {' + dataFields + ',' + 'hash:"'+ hash +'"}');
    } else {
        data = '{}';
    }

    return gulp.src( [ PARAMS.src.pages + '/*.html' ] )
        .pipe( packages.handlebars( data, options ) )
        .pipe( packages.replace({
            patterns: [
                {
                    match: /%=staticPrefixForCss=%|%=static=%|__static__/gim,
                    replacement: static
                }
            ],
            usePrefix: false
        }))
        .pipe(rename( function(path){
            console.log(path)
            path.extname = '.html';
            path.dirname = '';
        }))
        .pipe( gulp.dest( dist ) );

});

gulp.task(commands.handlebarsClean, function(){
    return packages.del( '.temp/partialsData.js' );
});

gulp.task(commands.clearAll, function(){
    return packages.del( `./${DEV}/**/*.*` );
});

gulp.task(commands.handlebarsData, function(){
    return gulp.src( PARAMS.src.handlebars + '/**/**/*.js' )
        .pipe( packages.concat('partialsData.js', { newLine: ',\n\n' } ) )
        .pipe( gulp.dest( '.temp' ) );
});

/** Task for browsersync start */
gulp.task(commands.browse, function() {
    packages.browserSync.init({
        server: {
            baseDir: `./${DEV}/`
        }
    });
});

/** Task for move images */
gulp.task(commands.moveImgs, function() {
    var dist;
    if(isBuild === true){
        dist = `${BUILD}s/${SOURCE}/${IMGS}`;
    } else if (cms === true) {
        dist = `${CMS}/${SOURCE}/${IMGS}`;
    }else {
        dist = `${DEV}/${SOURCE}/${IMGS}`;
    }
    return gulp.src([`!${PARAMS.src.imgs}/sprite/*.png`, `!${PARAMS.src.imgs}/svg/*.svg` ,`${PARAMS.src.imgs}/**/*.png`, `${PARAMS.src.imgs}/**/*.jpg`, `${PARAMS.src.imgs}/**/*.svg`])
        .pipe(gulp.dest(dist))
});

/** Task for move fonts for dev */
gulp.task(commands.moveFonts, function() {
    var dist;
    if(isBuild === true){

        dist = `${BUILD}s/${SOURCE}/${FONTS}`;

    } else if (cms === true) {
        dist = `${CMS}/${SOURCE}/${FONTS}`;

    }
    else {
        dist = `${DEV}/${SOURCE}/${FONTS}`;
    }
    return gulp.src([`${PARAMS.src.fonts}/**/*.*`])
        .pipe(gulp.dest(dist))
});

gulp.task(commands.moveMisc, function() {
    var dist;
    if(isBuild){

        dist = `${BUILD}s/`;

    } else if (cms === true) {
        dist = `${CMS}/`;
    } else {

        dist = `${DEV}/`;
    }
    return gulp.src(`${PARAMS.src.misc}/**/*.*`)
        .pipe(gulp.dest(dist))
});

/** Task for browsersync reload */
gulp.task(commands.reload, function() {
    packages.browserSync.reload();
});

gulp.task('reload:stream', function() {
    packages.browserSync.reload({stream: true});
});

/** Task for compile scss */
gulp.task(commands.css, function () {
    var name, dist, static;
    name = `main.css`;
    if(isBuild === true){
        name = `main.css`;
        dist = `${BUILD}s/${SOURCE}/css`;
        static = STATIC__BUILD.css

    } else if (cms === true) {
        dist = `${CMS}/${SOURCE}/css`;
        static = STATIC__CMS.css

    }else {
        dist = `${DEV}/${SOURCE}/css`;
        static = STATIC__DEV.css
    }
    return gulp.src(`${PARAMS.src.styles}/main.scss`)
        .pipe(packages.scss().on('error', packages.scss.logError))
        .pipe(packages.concat(name))
        .pipe( packages.replace({
            patterns: [
                {
                    match: /%=staticPrefixForCss=%|%=static=%|__static__/gim,
                    replacement: static
                }
            ],
            usePrefix: false
        }))
        .pipe(gulp.dest(dist)).pipe(packages.browserSync.reload({stream: true}));
});

/**  Task for compile ES6 files */
gulp.task(commands.js, function () {
    var name, webpackParams, dist, static;
    if(isBuild === true){
        name = `[name].js`;
        dist = `${BUILD}s/${SOURCE}/${JS}`;
        static = STATIC__BUILD.js;

    } else if (cms === true) {
        name = '[name].js';
        dist = `${CMS}/${SOURCE}/${JS}`;
        static = STATIC__CMS.js;
    }else {
        name = '[name].js';
        dist = `${DEV}/${SOURCE}/${JS}`;
        static = STATIC__DEV.js;
    }
    webpackParams = {
        output: {
            publicPath: `${DEV}/${SOURCE}/${JS}`,
            filename: name
        },
        devtool: isBuild ? null : 'cheap-module-inline-source-map',
        module: {
            loaders:[
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /(node_modules|source\/js\/components\/vendors\/plugins\/ui\/utils)/,
                    query: {
                        presets: ['es2015'],
                        plugins: ['transform-runtime'],
                        cacheDirectory: true
                    }
                }
            ]
        },
        optimization: {
            minimizer: [new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i
            })]
        },
        plugins: [

            new packages.webpack.NoErrorsPlugin(),
            new packages.webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChunks: 2
            })
        ]
    };
    if(cms == true) {
        Object.assign(webpackParams, {externals: {jquery: 'jQuery'}});
    }
    console.log(isBuild)
    return gulp.src(`${PARAMS.src.js}/*.js`)
        .pipe(packages.webpackStream(webpackParams, packages.webpack))
        .pipe( packages.replace({
            patterns: [
                {
                    match: /%=staticPrefixForCss=%|%=static=%|__static__/gim,
                    replacement: static
                }
            ],
            usePrefix: false
        }))
        .pipe(packages.gulpIf(isBuild, packages.uglify()))
        .pipe(gulp.dest(dist));
});

gulp.task(
    commands.html,
    gulp.series( commands.handlebarsData, commands.handlebarsCompile, commands.handlebarsClean )
);

/** Watcher for task's files */
gulp.task(commands.watch, function() {

    packages.chokidar([
            `${PARAMS.src.pages}/**/*.html`,
            `${PARAMS.src.handlebars}/**/*.hbs`,
            `${PARAMS.src.handlebars}/**/*.js`,
            `${PARAMS.src.handlebars}/**/**/*.js`
        ],
        gulp.series(
            commands.html,
            commands.reload
        )
    );
    packages.chokidar(`${PARAMS.src.js}/**/*.js`,
        gulp.series(
            commands.js,
            commands.reload
        )
    );
    packages.chokidar(`${PARAMS.src.imgs}/sprite/*.png`,
        gulp.series(
            commands.css,
            commands.moveImgs,
            commands.reload
        )
    );
    packages.chokidar(`${PARAMS.src.misc}/**/*.*`,
        gulp.series(
            commands.moveMisc,
            commands.reload
        )
    );
    packages.chokidar([`${PARAMS.src.handlebars}/**/*.scss`, `${PARAMS.src.styles}/*.scss`, `${PARAMS.src.styles}/**/*.scss`],
        gulp.series(
            commands.css,
            'reload:stream'
        )
    );
    packages.chokidar(`${PARAMS.src.imgs}/${SVG}/*.svg`,
        gulp.series(
            //commands.iconFont,
            commands.css,
            commands.moveFonts,
            commands.reload
        )
    );
    packages.chokidar([
            `!${PARAMS.src.imgs}/sprite/*.png`,
            `!${PARAMS.src.imgs}/${SVG}/*.svg`,
            `${PARAMS.src.imgs}/general/**/*.svg`,
            `${PARAMS.src.imgs}/content/**/*.svg`,
            `${PARAMS.src.imgs}/**/*.png`,
            `${PARAMS.src.imgs}/**/*.jpg`
        ],
        gulp.series(
            commands.moveImgs,
            commands.reload
        )
    );


});

gulp.task('isBuild', function(){
    isBuild = true;
    return packages.del( `./.temp` );
});
gulp.task('cms', function(){
    cms = true;
    return packages.del( `./.temp` );
});

/** Default task  */
gulp.task(
    commands.main,
    gulp.series(
        commands.clearAll,
        commands.html,
        //commands.iconFont,
        commands.css,
        commands.moveFonts,
        commands.moveImgs,
        commands.moveMisc,
        commands.js,
        gulp.parallel(
            commands.watch,
            commands.browse
        )
    )
);
gulp.task(
    commands.build,
    gulp.series(
        'isBuild',
        commands.html,
        //commands.iconFont,
        commands.css,
        commands.moveFonts,
        commands.moveImgs,
        commands.moveMisc,
        commands.js
    )
);
gulp.task(
    commands.cms,
    gulp.series(
        'cms',
        //commands.iconFont,
        commands.css,
        commands.moveFonts,
        commands.moveImgs,
        commands.js
    )
);

gulp.task('createPage', function() {

    let componentName = process.argv[3].replace('--','') || 'component';
    let componentPath = `${SOURCE}/${HANDLEBARS}/${PAGES}/${componentName}`;
    let htmlPath = `${SOURCE}/${PAGES}/`;


    if (packages.fs.existsSync(componentPath)) {
        throw new Error('The file allready exist');
    }

    appendToMainScss(componentName);

    createHTML(componentName, htmlPath);

    return createModule( componentName, componentPath );

});

gulp.task('createComp', function() {
    console.log(process.argv[3])
    let componentName = process.argv[3].replace('--','') || 'component';
    let componentPath = `${SOURCE}/${HANDLEBARS}/component/${componentName}`;

    if (packages.fs.existsSync(componentPath)) {
        throw new Error('The file allready exist');
    }

    return createModule( componentName, componentPath )


});

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
    <div class="wrapper">
        <div class="main-container">
        {{> component/header/header}}
        {{> pages/${fileName}/${fileName}}}
        </div>
        {{> component/footer/footer}}
    </div>
    {{> component/scripts/scripts}}
    </body>
    </html>`;

    file(`${fileName}.html`, htmlText, { src: true })
        .pipe(gulp.dest(`${path}`));
}

function appendToMainScss(elemScsssName) {

    let componentSCSS = `@import "../${HANDLEBARS}/${PAGES}/${elemScsssName}/${elemScsssName}.scss";`;

    gulp.src(`${SOURCE}/${SCSS}/main.scss`)
        .pipe(inject.append(`\n${componentSCSS}`))
        .pipe(gulp.dest(`${SOURCE}/${SCSS}/`));
}

gulp.task('creatLol', require('./gulp/creatComponents')(gulp, plugins));

