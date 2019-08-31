const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const url = 'https://www.xj.hk/btc/30.html';
    const response = await got({ method: 'get', url });
    const $ = cheerio.load(response.data);

    const list = $('font')
        .map((i, e) => {
            const element = $(e);
            const content = element.text();
            return {
                title: content,
                description: 'BTCUSD',
            };
        })
        .get();
    console.log(list);
    ctx.state.data = {
        title: 'xj.hk - BTCUSD 30分钟 买卖阻力 信号提醒',
        link: url,
        item: list,
    };
};
