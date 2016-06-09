import fs from 'fs'

// template for text
//
// fs.readFile('./output/nzdf2015_108.json', (err, data) => {
//   if (err) throw err;
//   let test = JSON.parse(data)
//   let num = test.formImage.Pages[0].Texts.length
//   let totalText = ''
//   for (let i = 0; i < test.formImage.Pages[0].Texts.length; i++) {
//     let text = test.formImage.Pages[0].Texts[i].R[0].T;
//     totalText += text
//   }
//   let decoded = (decodeURI(totalText))
//   fs.writeFile('./output/nzdf2015_108.txt', decoded, (err) => {
//     if (err) throw err;
//   })
// })


// template for tables

fs.readFile('./output/nzdf2015_108.json', (err, data) => {
    if (err) throw err;
    let test = JSON.parse(data)
    let num = test.formImage.Pages[0].Texts.length
    let totalText = ''
    for (let i = 0; i < test.formImage.Pages[0].Texts.length; i++) {
      let text = test.formImage.Pages[0].Texts[i].R[0].T;
      text = text.replace(/%20/g, ' ')
      text = text.replace(/%2C/g, ',')
      text = text.replace(/%2F/g, '/')

      // console.log(typeof text);
      console.log(text);
      totalText += text
    }
    // let decoded = (decodeURI(totalText))
    // fs.writeFile('./output/nzdf2015_108.txt', decoded, (err) => {
    //   if (err) throw err;
    // })

  })
  // fs.readFile('./output/nzdf2015.json', (err, data) => {
  //     if (err) throw err;
  //     let test = JSON.parse(data)
  //     console.log(test.formImage.Pages[0].Texts[0]);
  //   })
  //   // let num = test.formImage.Pages[0].Texts.length
  // let totalText = ''
  // for (let i = 0; i < test.formImage.Pages[0].Texts.length; i++) {
  //   let text = test.formImage.Pages[0].Texts[i].R[0].T;
  //   totalText += text
  // }
  // let decoded = (decodeURI(totalText))
  // fs.writeFile('./output/budget2015.txt', decoded, (err) => {
  // if (err) throw err;
  // })
  //
  // })
