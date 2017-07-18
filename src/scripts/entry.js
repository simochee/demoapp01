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
