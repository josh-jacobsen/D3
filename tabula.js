import tabula from 'tabula-js'
const t = tabula('./pdf/nzdf_report_2015_108');
t.extractCsv((err, data) => console.log(data));
