const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const rimraf = require('rimraf');
const handler = require('./handler');

const indexPath = path.join(__dirname, '/public/index.html');


module.exports = function(app) {
  app.get('/', function(req, res) {
    res.sendFile(indexPath);
  });

  app.post('/files', function(req, res) {
    console.log('post in files');
    const { name, file } = req.body;

    if (file) {
      if (file.startsWith('data:application/vnd.ms-excel;base64')) {
        base64Data = file.replace(/^data:application\/vnd.ms-excel;base64,/, '');
        fs.mkdirSync('./source');
        fs.writeFileSync(`./source/data.xls`, base64Data, 'base64');
        handler('./source/data.xls', function() {
          rimraf('./source', function () {
            res.download('./result.zip', 'result.zip');
          });
        })
      }
    }
  });
}
