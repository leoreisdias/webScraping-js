const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/microsoftbr/');
  
  const imgList = await page.evaluate(() =>{
      //Toda função será executada no Browser

      // Pegando todas as imagens na parte de Posts
        const nodeList = document.querySelectorAll('article img');
      // Transformar o NodeList em array
        const imgArray = [...nodeList];
      // Transformar os nodes (elementos html) em obj JS
        const imgList = imgArray.map(img =>({
            src: img.src
        }));

        // Colocar para fora da função
        return imgList;
  });

  // Escrever dados em um arquivo local
  fs.writeFile('instagram.json', JSON.stringify(imgList,null,2), err => {
      if(err) throw new Error('Something wrong happened');

      console.log('hacked!');
  })

  await browser.close();
})();