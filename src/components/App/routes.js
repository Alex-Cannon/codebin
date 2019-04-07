module.exports = [{
  path: '/',
  component: require('../../pages/Index/Index.js').default
}, {
  path: '/signup',
  component: require('../../pages/Signup/Signup.js').default
}, {
  path: '/login',
  component: require('../../pages/Login/Login.js').default
}, {
  path: '/:USER_NAME/dashboard',
  component: require('../../pages/Dashboard/Dashboard.js').default
}, {
  path: '/:USER_NAME/settings',
  component: require('../../pages/Settings/Settings.js').default
}, {
  path: '/bin/:BIN_ID',
  component: require('../../pages/Bin/Bin.js').default
}, {
  component: require('../../pages/Page404/Page404.js').default
}];