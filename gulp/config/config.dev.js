module.exports = {
  dist: 'dist',
  srcFolder: 'source',
  get jsFolder() {
    return `${this.dist}/${this.srcFolder}/js`
  },
  cssFolder: ''
};
