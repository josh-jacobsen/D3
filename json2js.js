import fs from 'fs'

let input = "./output/nzdf_report_2015_110.json"
let output = "./output/nzdf2015_110.js"

fs.readFile(input, (err, data) => {
    let myArray = []
    if (err) throw err;
    let test = JSON.parse(data)
    let num = test.formImage.Pages[0].Texts.length
    let totalText = ''
    for (let i = 0; i < test.formImage.Pages[0].Texts.length; i++) {
      let text = test.formImage.Pages[0].Texts[i].R[0].T;
      text = text.replace(/%20|%2C|%2F/g, ' ')
      myArray.push(text)
      totalText += text
    }
    fs.writeFile(output, JSON.stringify(myArray), (err) => {
      if (err) throw err;
    })
  })
