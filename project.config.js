module.exports = {

  'develop': 'src',
  'product': 'build',
  'static' : 'static',
  'temp'   : '.tmp',

  get less    () { return this['develop'] + '/less/*.less'; },
  get scripts () { return this['develop'] + '/scripts/**/*.js'; }

};
