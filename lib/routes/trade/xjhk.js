const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    // 读取5，15，30，60，240，1440min的BTCUSD信号
    let time_range = [5, 15, 30, 60, 240, 1440];
    let result = [];
    for (let key in time_range) {
        let value = time_range[key];
        const url = 'https://www.xj.hk/btc/' + value + '.html';
        const response = await got({ method: 'get', url });
        const $ = cheerio.load(response.data);
        const list = $('font')
            .map((i, e) => {
                const element = $(e);
                const content = element.text();
                return {
                    title: content,
                    description: 'BTCUSD_' + value + '分钟_信号',
                };
            })
            .get();
        result = result.concat(list);
    }

    ctx.state.data = {
        title: 'xj.hk出品 - BTCUSD 买/卖/撑/压 信号提醒',
        link: 'https://www.xj.hk/btc/api.html',
        item: result,
    };
};
