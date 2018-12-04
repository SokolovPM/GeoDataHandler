const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const zipdir = require('zip-dir');
const rimraf = require('rimraf');

module.exports = function(link, callback) {
  var buf = fs.readFileSync(link);
  var wb = XLSX.read(buf, {type:'buffer'});

  const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1})

  const arr = data.map(el => {
    return {
      a: el[0],
      b: el[1],
      c: el[2],
      d: el[3],
      e: el[4],
    }
  })

  let result = {};
  arr.forEach(obj => {
    if(obj.e) {
      let code = '' + obj.e;
      if (code.startsWith('--') || code.startsWith('..')) {
        code = code.substring(2);
      }
      if (code.startsWith('-') || code.startsWith('.')) {
        code = code.substring(1);
      }
      if (code.endsWith('--') || code.endsWith('..')) {
        code = code.substring(0, code.length - 2)
      }
      if (code.endsWith('-') || code.endsWith('.')) {
        code = code.substring(0, code.length - 1)
      }
      if (code.startsWith('--') || code.startsWith('..')) {
        code = code.substring(2);
      }
      if (code.startsWith('-') || code.startsWith('.')) {
        code = code.substring(1);
      }
      if (code.endsWith('--') || code.endsWith('..')) {
        code = code.substring(0, code.length - 2)
      }
      if (code.endsWith('-') || code.endsWith('.')) {
        code = code.substring(0, code.length - 1)
      }
      if (code.includes('-') || code.includes('.')) {
        code = 'other'
      }

      if (!result[code]) {
        result[code] = []
      }
      result[code].push([obj.a, obj.b, obj.c, obj.d].join(' '));
    }
  })

  fs.mkdirSync('./result');
  Object.keys(result).forEach(code => {
    fs.appendFileSync(`./result/${code}.txt`, result[code].join('\n'));
  })

  zipdir('./result', { saveTo: 'result.zip' }, function (err, buffer) {
    rimraf('./result', function () {
      callback()
    });
  });
}
