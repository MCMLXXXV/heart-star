module.exports = {

  'paths': {
    'src'   : 'src',
    'dist'  : 'build',
    'static': 'static',
    'temp'  : '.tmp',

    get less    () { return this['src'] + '/less/*.less'; },
    get scripts () { return this['src'] + '/scripts/**/*.js'; }
  },

  'traceurOptions': {
    modules: 'register',
    moduleName: true
  }

};
