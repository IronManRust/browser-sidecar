// +--------------+
// | Dependencies |
// +--------------+

var gulp = require('gulp');
var del = require('del');
var es = require('event-stream');
var rseq = require('run-sequence');
var zip = require('gulp-zip');
var replace = require('gulp-token-replace');
var ignore = require('gulp-ignore');
var rename = require('gulp-rename');
var jsonpatch = require('jsonpatch');
var args = require('yargs').argv;

// +------------------------+
// | Command Line Arguments |
// +------------------------+

var config = require('./config/config.json');
var environment = 'Local';
if (args.env && (args.env === 'Development' || args.env === 'QA' || args.env === 'Stage' || args.env === 'Production')) {
    config = jsonpatch.apply_patch(config, require('./config/config.patch-' + args.env + '.json'));
    environment = args.env;
}

// +------------------+
// | Helper Functions |
// +------------------+

function pipe(src, transforms, dest) {
    if (typeof transforms === 'string') {
        dest = transforms;
        transforms = null;
    }

    var stream = gulp.src(src);
    transforms && transforms.forEach(function (transform) {
        stream = stream.pipe(transform);
    });

    if (dest) {
        stream = stream.pipe(gulp.dest(dest));
    }

    return stream;
}

// +------------+
// | Meta Tasks |
// +------------+

gulp.task('default', function (cb) {
    return rseq(['clean'], ['build'], ['config'], ['store'], ['dist'], cb);
});

gulp.task('chrome', function (cb) {
    return rseq(['chrome-clean'], ['chrome-build'], ['chrome-config'], ['chrome-store'], ['chrome-dist'], cb);
});

gulp.task('edge', function (cb) {
    return rseq(['edge-clean'], ['edge-build'], ['edge-config'], ['edge-store'], ['edge-dist'], cb);
});

gulp.task('firefox', function (cb) {
    return rseq(['firefox-clean'], ['firefox-build'], ['firefox-config'], ['firefox-store'], ['firefox-dist'], cb);
});

gulp.task('opera', function (cb) {
    return rseq(['opera-clean'], ['opera-build'], ['opera-config'], ['opera-store'], ['opera-dist'], cb);
});

gulp.task('safari', function (cb) {
    return rseq(['safari-clean'], ['safari-build'], ['safari-config'], ['safari-store'], ['safari-dist'], cb);
});

gulp.task('vivaldi', function (cb) {
    return rseq(['vivaldi-clean'], ['vivaldi-build'], ['vivaldi-config'], ['vivaldi-store'], ['vivaldi-dist'], cb);
});

gulp.task('yandex', function (cb) {
    return rseq(['yandex-clean'], ['yandex-build'], ['yandex-config'], ['yandex-store'], ['yandex-dist'], cb);
});

// +-----------------------+
// | Task - Step 1 - Clean |
// +-----------------------+

gulp.task('clean', function (cb) {
    return rseq(['chrome-clean', 'edge-clean', 'firefox-clean', 'opera-clean', 'safari-clean', 'vivaldi-clean', 'yandex-clean'], cb);
});

gulp.task('chrome-clean', function (cb) {
    return del(['./build/chrome/**/*', './config/chrome/**/*', './dist/chrome/**/*'], cb);
});

gulp.task('edge-clean', function (cb) {
    return del(['./build/edge/**/*', './config/edge/**/*', './dist/edge/**/*'], cb);
});

gulp.task('firefox-clean', function (cb) {
    return del(['./build/firefox/**/*', './config/firefox/**/*', './dist/firefox/**/*'], cb);
});

gulp.task('opera-clean', function (cb) {
    return del(['./build/opera/**/*', './config/opera/**/*', './dist/opera/**/*'], cb);
});

gulp.task('safari-clean', function (cb) {
    return del(['./build/safari/**/*', './config/safari/**/*', './dist/safari/**/*'], cb);
});

gulp.task('vivaldi-clean', function (cb) {
    return del(['./build/vivaldi/**/*', './config/vivaldi/**/*', './dist/vivaldi/**/*'], cb);
});

gulp.task('yandex-clean', function (cb) {
    return del(['./build/yandex/**/*', './config/yandex/**/*', './dist/yandex/**/*'], cb);
});

// +-----------------------+
// | Task - Step 2 - Build |
// +-----------------------+

gulp.task('build', function (cb) {
    return rseq(['chrome-build', 'edge-build', 'firefox-build', 'opera-build', 'safari-build', 'vivaldi-build', 'yandex-build'], cb);
});

gulp.task('chrome-build', function () {
    return es.merge(pipe('./lib/**/*', './build/chrome/lib'),
                    pipe('./img/**/*', './build/chrome/img'),
                    pipe('./js/**/*', './build/chrome/js'),
                    pipe('./css/**/*', './build/chrome/css'),
                    pipe('./html/**/*', './build/chrome/html'),
                    pipe('./vendor/chrome/browser-sidecar-vendor.js', './build/chrome/js'),
                    pipe('./vendor/chrome/background.js', './build/chrome/js'),
                    pipe('./vendor/chrome/manifest.json', './build/chrome'));
});

gulp.task('edge-build', function () {
    return es.merge(pipe('./lib/**/*', './build/edge/lib'),
                    pipe('./img/**/*', './build/edge/img'),
                    pipe('./js/**/*', './build/edge/js'),
                    pipe('./css/**/*', './build/edge/css'),
                    pipe('./html/**/*', './build/edge/html'),
                    pipe('./vendor/edge/browser-sidecar-vendor.js', './build/edge/js'),
                    pipe('./vendor/edge/background.html', './build/edge/html'),
                    pipe('./vendor/edge/background.js', './build/edge/js'),
                    pipe('./vendor/edge/manifest.json', './build/edge'));
});

gulp.task('firefox-build', function () {
    return es.merge(pipe('./lib/**/*', './build/firefox/lib'),
                    pipe('./img/**/*', './build/firefox/img'),
                    pipe('./js/**/*', './build/firefox/js'),
                    pipe('./css/**/*', './build/firefox/css'),
                    pipe('./html/**/*', './build/firefox/html'),
                    pipe('./vendor/firefox/browser-sidecar-vendor.js', './build/firefox/js'),
                    pipe('./vendor/firefox/background.js', './build/firefox/js'),
                    pipe('./vendor/firefox/manifest.json', './build/firefox'));
});

gulp.task('opera-build', function () {
    return es.merge(pipe('./lib/**/*', './build/opera/lib'),
                    pipe('./img/**/*', './build/opera/img'),
                    pipe('./js/**/*', './build/opera/js'),
                    pipe('./css/**/*', './build/opera/css'),
                    pipe('./html/**/*', './build/opera/html'),
                    pipe('./vendor/opera/browser-sidecar-vendor.js', './build/opera/js'),
                    pipe('./vendor/opera/background.js', './build/opera/js'),
                    pipe('./vendor/opera/manifest.json', './build/opera'));
});

gulp.task('safari-build', function () {
    return es.merge(pipe('./lib/**/*', './build/safari/lib'),
                    pipe('./img/**/*', './build/safari/img'),
                    pipe('./js/**/*', './build/safari/js'),
                    pipe('./css/**/*', './build/safari/css'),
                    pipe('./html/**/*', './build/safari/html'),
                    pipe('./vendor/safari/browser-sidecar-vendor.js', './build/safari/js'),
                    pipe('./vendor/safari/global.html', './build/safari/html'),
                    pipe('./vendor/safari/global.js', './build/safari/js'),
                    pipe('./vendor/safari/global.png', './build/safari/img'),
                    pipe('./vendor/safari/Info.plist', './build/safari'),
                    pipe('./vendor/safari/Settings.plist', './build/safari'),
                    pipe('./img/icon-16.png', './build/safari'),
                    pipe('./img/icon-32.png', './build/safari'),
                    pipe('./img/icon-64.png', './build/safari'));
});

gulp.task('vivaldi-build', function () {
    return es.merge(pipe('./lib/**/*', './build/vivaldi/lib'),
                    pipe('./img/**/*', './build/vivaldi/img'),
                    pipe('./js/**/*', './build/vivaldi/js'),
                    pipe('./css/**/*', './build/vivaldi/css'),
                    pipe('./html/**/*', './build/vivaldi/html'),
                    pipe('./vendor/vivaldi/browser-sidecar-vendor.js', './build/vivaldi/js'),
                    pipe('./vendor/vivaldi/background.js', './build/vivaldi/js'),
                    pipe('./vendor/vivaldi/manifest.json', './build/vivaldi'));
});

gulp.task('yandex-build', function () {
    return es.merge(pipe('./lib/**/*', './build/yandex/lib'),
                    pipe('./img/**/*', './build/yandex/img'),
                    pipe('./js/**/*', './build/yandex/js'),
                    pipe('./css/**/*', './build/yandex/css'),
                    pipe('./html/**/*', './build/yandex/html'),
                    pipe('./vendor/yandex/browser-sidecar-vendor.js', './build/yandex/js'),
                    pipe('./vendor/yandex/background.js', './build/yandex/js'),
                    pipe('./vendor/yandex/manifest.json', './build/yandex'));
});

// +---------------------------+
// | Task - Step 3 - Configure |
// +---------------------------+

gulp.task('config', function (cb) {
    return rseq(['chrome-config', 'edge-config', 'firefox-config', 'opera-config', 'safari-config', 'vivaldi-config', 'yandex-config'], cb);
});

gulp.task('chrome-config', function (cb) {
    return rseq(['chrome-config-copy', 'chrome-config-replace'], cb);
});

gulp.task('chrome-config-copy', function () {
    return gulp.src(['./build/chrome/**/*'])
               .pipe(ignore.exclude('**/*.js'))
               .pipe(ignore.exclude('**/*.json'))
               .pipe(ignore.exclude('**/*.html'))
               .pipe(gulp.dest('./config/chrome'));
});

gulp.task('chrome-config-replace', function () {
    return gulp.src(['./build/chrome/**/*.js', './build/chrome/**/*.json', './build/chrome/**/*.html'])
               .pipe(replace({ global: config }))
               .pipe(gulp.dest('./config/chrome'));
});

gulp.task('edge-config', function (cb) {
    return rseq(['edge-config-copy', 'edge-config-replace'], cb);
});

gulp.task('edge-config-copy', function () {
    return gulp.src(['./build/edge/**/*'])
               .pipe(ignore.exclude('**/*.js'))
               .pipe(ignore.exclude('**/*.json'))
               .pipe(ignore.exclude('**/*.html'))
               .pipe(gulp.dest('./config/edge'));
});

gulp.task('edge-config-replace', function () {
    return gulp.src(['./build/edge/**/*.js', './build/edge/**/*.json', './build/edge/**/*.html'])
               .pipe(replace({ global: config }))
               .pipe(gulp.dest('./config/edge'));
});

gulp.task('firefox-config', function (cb) {
    return rseq(['firefox-config-copy', 'firefox-config-replace'], cb);
});

gulp.task('firefox-config-copy', function () {
    return gulp.src(['./build/firefox/**/*'])
               .pipe(ignore.exclude('**/*.js'))
               .pipe(ignore.exclude('**/*.json'))
               .pipe(ignore.exclude('**/*.html'))
               .pipe(gulp.dest('./config/firefox'));
});

gulp.task('firefox-config-replace', function () {
    return gulp.src(['./build/firefox/**/*.js', './build/firefox/**/*.json', './build/firefox/**/*.html'])
               .pipe(replace({ global: config }))
               .pipe(gulp.dest('./config/firefox'));
});

gulp.task('opera-config', function (cb) {
    return rseq(['opera-config-copy', 'opera-config-replace'], cb);
});

gulp.task('opera-config-copy', function () {
    return gulp.src(['./build/opera/**/*'])
               .pipe(ignore.exclude('**/*.js'))
               .pipe(ignore.exclude('**/*.json'))
               .pipe(ignore.exclude('**/*.html'))
               .pipe(gulp.dest('./config/opera'));
});

gulp.task('opera-config-replace', function () {
    return gulp.src(['./build/opera/**/*.js', './build/opera/**/*.json', './build/opera/**/*.html'])
               .pipe(replace({ global: config }))
               .pipe(gulp.dest('./config/opera'));
});

gulp.task('safari-config', function (cb) {
    return rseq(['safari-config-copy', 'safari-config-replace'], cb);
});

gulp.task('safari-config-copy', function () {
    return gulp.src(['./build/safari/**/*'])
               .pipe(ignore.exclude('**/*.js'))
               .pipe(ignore.exclude('**/*.json'))
               .pipe(ignore.exclude('**/*.html'))
               .pipe(ignore.exclude('**/*.plist'))
               .pipe(gulp.dest('./config/safari'));
});

gulp.task('safari-config-replace', function () {
    return gulp.src(['./build/safari/**/*.js', './build/safari/**/*.json', './build/safari/**/*.html', './build/safari/**/*.plist'])
               .pipe(replace({ global: config }))
               .pipe(gulp.dest('./config/safari'));
});

gulp.task('vivaldi-config', function (cb) {
    return rseq(['vivaldi-config-copy', 'vivaldi-config-replace'], cb);
});

gulp.task('vivaldi-config-copy', function () {
    return gulp.src(['./build/vivaldi/**/*'])
               .pipe(ignore.exclude('**/*.js'))
               .pipe(ignore.exclude('**/*.json'))
               .pipe(ignore.exclude('**/*.html'))
               .pipe(gulp.dest('./config/vivaldi'));
});

gulp.task('vivaldi-config-replace', function () {
    return gulp.src(['./build/vivaldi/**/*.js', './build/vivaldi/**/*.json', './build/vivaldi/**/*.html'])
               .pipe(replace({ global: config }))
               .pipe(gulp.dest('./config/vivaldi'));
});

gulp.task('yandex-config', function (cb) {
    return rseq(['yandex-config-copy', 'yandex-config-replace'], cb);
});

gulp.task('yandex-config-copy', function () {
    return gulp.src(['./build/yandex/**/*'])
               .pipe(ignore.exclude('**/*.js'))
               .pipe(ignore.exclude('**/*.json'))
               .pipe(ignore.exclude('**/*.html'))
               .pipe(gulp.dest('./config/yandex'));
});

gulp.task('yandex-config-replace', function () {
    return gulp.src(['./build/yandex/**/*.js', './build/yandex/**/*.json', './build/yandex/**/*.html'])
               .pipe(replace({ global: config }))
               .pipe(gulp.dest('./config/yandex'));
});

// +------------------------------+
// | Task - Step 4 - Store Assets |
// +------------------------------+

gulp.task('store', function (cb) {
    return rseq(['chrome-store', 'edge-store', 'firefox-store', 'opera-store', 'safari-store', 'vivaldi-store', 'yandex-store'], cb);
});

gulp.task('chrome-store', function () {
    return gulp.src(['./store/change-log.txt', './store/chrome/screenshot.png'])
               .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-store.zip'))
               .pipe(gulp.dest('./dist/chrome'));
});

gulp.task('edge-store', function () {
    return gulp.src(['./store/change-log.txt', './store/edge/screenshot.png'])
               .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-store.zip'))
               .pipe(gulp.dest('./dist/edge'));
});

gulp.task('firefox-store', function () {
    return gulp.src(['./store/change-log.txt', './store/firefox/screenshot.png'])
               .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-store.zip'))
               .pipe(gulp.dest('./dist/firefox'));
});

gulp.task('opera-store', function () {
    return gulp.src(['./store/change-log.txt', './store/opera/screenshot.png'])
               .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-store.zip'))
               .pipe(gulp.dest('./dist/opera'));
});

gulp.task('safari-store', function () {
    return gulp.src(['./store/change-log.txt', './store/safari/screenshot.png'])
               .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-store.zip'))
               .pipe(gulp.dest('./dist/safari'));
});

gulp.task('vivaldi-store', function () {
    return gulp.src(['./store/change-log.txt', './store/vivaldi/screenshot.png'])
               .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-store.zip'))
               .pipe(gulp.dest('./dist/vivaldi'));
});

gulp.task('yandex-store', function () {
    return gulp.src(['./store/change-log.txt', './store/yandex/screenshot.png'])
               .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-store.zip'))
               .pipe(gulp.dest('./dist/yandex'));
});

// +----------------------------+
// | Task - Step 5 - Distribute |
// +----------------------------+

gulp.task('dist', function (cb) {
    return rseq(['chrome-dist', 'edge-dist', 'firefox-dist', 'opera-dist', 'safari-dist', 'vivaldi-dist', 'yandex-dist'], cb);
});

gulp.task('chrome-dist', function () {
    gulp.src('./config/chrome/**/*')
        .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-extension.zip'))
        .pipe(gulp.dest('./dist/chrome'));
});

gulp.task('edge-dist', function () {
    gulp.src('./config/edge/**/*')
        .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-extension.zip'))
        .pipe(gulp.dest('./dist/edge'));
});

gulp.task('firefox-dist', function () {
    gulp.src('./config/firefox/**/*')
        .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-extension.xpi'))
        .pipe(gulp.dest('./dist/firefox'));
});

gulp.task('opera-dist', function () {
    gulp.src('./config/opera/**/*')
        .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-extension.zip'))
        .pipe(gulp.dest('./dist/opera'));
});

gulp.task('safari-dist', function () {
    gulp.src('./config/safari/**/*')
        .pipe(gulp.dest('./dist/safari/browser-sidecar-' + config.version + '-' + environment + '.safariextension'));
});

gulp.task('vivaldi-dist', function () {
    gulp.src('./config/vivaldi/**/*')
        .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-extension.zip'))
        .pipe(gulp.dest('./dist/vivaldi'));
});

gulp.task('yandex-dist', function () {
    gulp.src('./config/yandex/**/*')
        .pipe(zip('browser-sidecar-' + config.version + '-' + environment + '-extension.zip'))
        .pipe(gulp.dest('./dist/yandex'));
});