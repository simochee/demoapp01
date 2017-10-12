/**
 * ニュース関係のデータを取得するモジュール
 */
module.exports = {
    /**
     * すべてのデータを取得する
     * @return {object} Promise
     */
    get: () => {
        return new Promise((resolve, reject) => {
            YAML.load('../data/news.yaml', (result) => {

            });
        });
    },
    /**
     * ニュースフラッシュを指定された個数だけ取得する
     * @param {number} num 取得する件数（defualt: 5）
     * @return {object} Promise
     */
    flash: (num = 5) => {
        return new Promise((resolve, reject) => {
            YAML.load('../data/news.yaml', (result) => {

            });
        });
    },
};
