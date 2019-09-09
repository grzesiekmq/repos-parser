const axios = require('axios');
const fs = require("fs");
const cheerio = require("cheerio");

const user = "grzesiekmq";
const url = `https://github.com/${user}?utf8=%E2%9C%93&tab=repositories&q=&type=&language=javascript`;

const fetchData = async () => {
    const result = await axios.get(url);
    const html = result.data;
    return cheerio.load(html);
};
(async () => {
    const $ = await fetchData();
    const repos = $('ul li h3 a');
    const txt = repos.text();
    fs.writeFile('repos.txt', txt, (err) => 
    {
        if (err) {return console.err(err);}
        console.log('repos written with data');
    });
})();