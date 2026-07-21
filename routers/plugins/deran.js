const Requste = require("../../libs/req.js");
//static scraping
const cheerio = require("cheerio");

async function DataPage(url) {
    const re = new Requste(url);
    re.defulte();
    const result = await re.Get();
    if (!result.result) {
        return null;
    }
    const $ = cheerio.load(result.body);
    let newsHeader = $("h1.news-heading").text().trim();
    let newsContent = $("div.news-content").text().trim()
    let image = $("div.news-banner img").attr("src")
    
    let datas =  {
      titel: newsHeader,
      image: image,
      content: newsContent,
      
    }
    return datas;
}

module.exports = {
    name: "dhrean",
    func: async (req, res) => {
        const re = new Requste("https://sinhala.adaderana.lk/");
        re.defulte();
        const result = await re.Get();
        if (!result.result) {
            res.json(result);
        }
        const $ = cheerio.load(result.body);
        const promises = $("div.story-text div.thumb-image a").map(async(i, el) => {
            let link = $(el).attr("href");
            return await DataPage("https://sinhala.adaderana.lk/" + link)
        }).get()
        const links = await Promise.all(promises)
        await res.json(links);
    }
};
