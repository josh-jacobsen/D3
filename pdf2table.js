import fs from 'fs'
import pdf2json from './node_modules/pdf2json/PDFParser'


fs.readFile('./pdf/nzdf_report_2015_108.pdf', function (err, buffer) {
  if (err) return console.log(err);

  pdf2table.parse(buffer, function (err, rows, rowsdebug) {
    if (err) return console.log(err);

    console.log(rows);
  });
});
