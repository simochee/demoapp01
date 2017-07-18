const route = require('riot-route').default;

// ルーターの起動
exports.start = () => {
    route.start(true);
};

require('./tags/pages/splash');
route('/', () => {
    riot.mount('page', 'splash');
});
