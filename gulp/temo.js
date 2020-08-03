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