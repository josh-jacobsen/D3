// PDF to JSON (working) (template)

// let fs = require('fs'),
//   PDFParser = require("./node_modules/pdf2json/PDFParser");
//
// let pdfParser = new PDFParser();
//
// pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
// pdfParser.on("pdfParser_dataReady", pdfData => {
//   fs.writeFile("./output/test2.json", JSON.stringify(pdfData));
// });
//
// pdfParser.loadPDF("./pdf/test.pdf");


let fs = require('fs'),
  PDFParser = require("./node_modules/pdf2json/PDFParser");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
  fs.writeFile("./output/nzdf2015.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF("./pdf/nzdf_report_2015.pdf");









// PDF to txt (not working)

// let fs = require('fs'),
//   PDFParser = require("./node_modules/pdf2json/PDFParser");
//
// let pdfParser = new PDFParser();
//
// pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
// pdfParser.on("pdfParser_dataReady", pdfData => {
//
//   console.log('pdf data: ', pdfData)
//   console.log('pdf data type', typeof pdfData);
//   let test = JSON.stringify(pdfData)
//   console.log('test type', typeof test);
//   console.log(test);
//   fs.writeFile("./output/text2.txt", test);
// });
//
// pdfParser.loadPDF("./pdf/test.pdf");



// pipe input and output streams

// let fs = require('fs'),
//   PDFParser = require("./node_modules/pdf2json/PDFParser");
//
// let pdfParser = new PDFParser();
//
// let inputStream = fs.createReadStream("./pdf/test.pdf", {
//   bufferSize: 64 * 1024
// });
// let outputStram = fs.createWriteStream("./output/test.json");
//
// inputStream.pipe(pdfParser).pipe(new StringifyStream()).pipe(outputStream);


// var txtFile = "/tmp/test.txt";
// var file = new File(txtFile, "write");
// var str = JSON.stringify(JsonExport);
//
// log("opening file...");
// file.open();
// log("writing file..");
// file.writeline(str);
// file.close();
