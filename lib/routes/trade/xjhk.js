const date = require('@/utils/date');
const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const url = 'https://www.xj.hk/btc/30.html';
    const response = await got({ method: 'get', url });
    const $ = cheerio.load(response.data);
    console.log(response.data);
    ctx.state.data = {
        title: 'xj.hk - 买卖信号提醒',
        link: url,
        item: ['foo','bar'],
    };
};
