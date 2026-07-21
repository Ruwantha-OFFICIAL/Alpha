const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');

async function SearchMovie(name) {
  const url = encodeURI("https://cinesubz.net/?s="+name);
  const res = await cloudscraper.get(url)
  const $ = cheerio.load(res)
  console.log(res.html)
  let count = $(".item-desc-title h3").length;
  console.log("item count :", count)
  let links = $("div.display-item").map((i,el)=>{
    let titel = $(el).find(".item-desc-title h3").text().trim()
    let link = $(el).find("a").attr("href")
    let imdbScore = $(el).find(".imdb-score").text()
    return {
      titel,
      link,
      imdbScore
    }
  }).get()
  return links
}
async function Dl(url){
  const res = await cloudscraper.get(url)
  const $ = cheerio.load(res)
  let link = $(".wait-done a#link").attr("href");
  console.log("links :", link)
  return link
}
async function DownlodMovie(value) {
  const url = encodeURI(value);
  const res = await cloudscraper.get(url)
  const $ = cheerio.load(res)
  let image = $("img.poster-img").attr("src")
  let title = $(".details-title h3").text().trim()
  let rating = $(".rating-average span").text()
  let genre = $("div.details-genre a").map((i,el)=>{ return $(el).text()}).get()
  let downlodlink = $("div.movie-download-link-item a").get()
  
  let downlod =await Promise.all(downlodlink.map(async(el)=>{
    let getdl = $(el).attr("href");
    return await Dl(getdl)
  }))
  let des = $(".details-desc p").map((i,el)=>{
    return $(el).text().trim()
  }).get().join(" ")
  
  return {
    title,
    rating,
    image,
    des,
    genre,
    downlod
  }
}

module.exports = {
  name:"cinesub",
  func: async(req,res)=>{
    let search = req.query.search;
    let download = req.query.download;
    if(search){
      let respones = await SearchMovie(search)
      await res.json(respones)
    }else if(download){
      let respones = await DownlodMovie(download)
      await res.json(respones)
    }else{
      res.json({
        status: false,
        message: 'Go to Doc'
      })
    }
  }
}