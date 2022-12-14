const axios = require('axios');
const cheerio = require('cheerio');

const fetchGames = async()=>{
    try{
        const response = await axios.get('https://www.amazon.com/s?i=specialty-aps&bbn=16225009011&rh=n%3A%2116225009011%2Cn%3A502394&ref=nav_em__nav_desktop_sa_intl_camera_and_photo_0_2_5_3')
        const html = response.data;
        const $ = cheerio.load(html);
        const games = [];
        $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20').each((index,el)=>{
            const game = $(el);
            const title =game.find('span.a-size-base-plus.a-color-base.a-text-normal').text();
            games.push(title);
        })
        return games;
    }catch(err){
        console.log(err)
    }
}
fetchGames().then(game=>console.log(game));
