// PDF to JSON

let fs = require('fs'),
  PDFParser = require("./node_modules/pdf2json/PDFParser");

let pdfParser = new PDFParser();

let input = "./pdf/nzdf_report_2015_110.pdf"
let output = "./output/nzdf_report_2015_110.json"

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
  fs.writeFile(output, JSON.stringify(pdfData));
});

pdfParser.loadPDF(input);
