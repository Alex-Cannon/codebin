const router = require('express').Router();
const fs = require('fs');
const dirs = ['bin', 'other', 'search', 'user' ];

dirs.forEach(dir => {
  let files = fs.readdirSync(`${__dirname}/${dir}/`);
  files.forEach((file) => {
    router.use(require(`./${dir}/${file}`));
  });
});

module.exports = router;