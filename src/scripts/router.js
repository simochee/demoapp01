const route = require('riot-route').default;

// リダイレクトさせる関数
const redirect = (url) => {
    location.hash = url;
};

// ルーターの起動
exports.start = () => {
    route.start(true);
};

/**
 * スプラッシュ画面
 */
require('./tags/pages/splash');
route('/', () => {
    riot.mount('page', 'splash');
});

/**
 * メニュー画面
 */
require('./tags/pages/menu');
route('/menu', () => {
    riot.mount('page', 'menu');
});

/**
 * ホーム
 */
require('./tags/pages/home');
route('/home', () => {
    riot.mount('page', 'home');
});

/**
 * 自分のプロフィールへリダイレクト
 */
route('/profile', () => {
    const userId = Lockr.get('userId');
    redirect(`/profile/${userId}`);
});

/**
 * プロフィール
 */
require('./tags/pages/profile');
route('/profile/*', (userId) => {
    riot.mount('page', 'profile', {
        userId,
    });
});

/**
 * ニュース
 */
require('./tags/pages/news');
route('/news', () => {
    riot.mount('page', 'news');
});
