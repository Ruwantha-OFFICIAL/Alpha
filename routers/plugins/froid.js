const Requste = require("../../libs/req.js");
//static scraping
const cheerio = require("cheerio");

async function Download(link) {
  const re = new Requste(link);
  re.defulte();
  const result = await re.Get();
  const $ = cheerio.load(result.body)
  let icon = $("img.package-icon").attr("src")
  let vestion = $(".package-version-header b").first().text().replace("Version ", "").trim();

  let downlod = $(".package-version-download a").first().attr("href");

  return {
    icon,
    vestion,
    downlod
  }
}

module.exports = {
  name:"froid",
  func: async(req,res)=>{
    let search = req.query.search;
    let url = encodeURI("https://search.f-droid.org/?q="+search);
    const re = new Requste(url);
    re.defulte();
    const result = await re.Get();
    const $ = cheerio.load(result.body)
    //console.log(result.body)
    //console.log("length", $("a.package-header"))
    let elments = $("a.package-header").get()
    let links = await Promise.all(elments.map(async(el)=>{
      let link = $(el).attr("href")
      let name = $(el).find("h4.package-name").text().trim()
      let other = await Download(link)
      return {
        name,
        version: other.vestion,
        image: other.icon,
        download: other.downlod
      }
    }))
    await res.json(links)
  }
}