/**
 * サービスワーカーの起動
 */
window.addEventListener('load', () => {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./serviceWorker.js')
            .then((registration) => {
                console.log('serviceWorker registed.');
            }).catch((error) => {
                console.warn('serviceWorker error.', error);
            });
    }
});

/**
 * Yamlのデータを取得するモジュール
 */
global.model = require('./models');

/**
 * appタグのマウント
 */
require('./tags/app.tag');
require('./tags/components/tabbar');

riot.mount('app');

/**
 * ルーターの起動
 */
const router = require('./router');
router.start();
