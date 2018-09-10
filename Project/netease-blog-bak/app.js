const puppeteer = require('puppeteer');
const fs = require('fs');

let counter = 0;

(async () => {
    const browser = await puppeteer.launch({
        devtools: true
    });
    const page = await browser.newPage();

    // await page.evaluate(() => {debugger;});
    // 监听请求
    // page.on('request', (e) => {
    //     console.log('req', e.url());
    // });

    // 监听回复
    page.on('response', (res) => {

        // console.log(res.buffer());
        res.buffer().then(buffer => {
            fs.writeFile(`./resource/${res.url().split('/').pop().split('?').shift()}`, buffer, (err) => {
                if (err) {
                    console.log(`**Error: ${res.url()}`);
                } else {
                    console.log(`Success: ${res.url()}`);
                }
            });
        }).catch(err => {
            console.log('i fucked');
        })
    });

    await page.goto('http://mzs1973.blog.163.com/blog/#m=0');

    // await page.screenshot({
    //     path: 'example.png'
    // });
    // await browser.close();
})();