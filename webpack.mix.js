const mix = require("laravel-mix");
require("dotenv").config();
/*
 |-----------------------------------------------------------------------</section><section class="
 noflag">
 | Mix Asset Management
 |-----------------------------------------------------------------------</section><section class="
 noflag">
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.options({
    processCssUrls: false
});

if (!mix.inProduction()) {
    mix.webpackConfig({
        devtool: "source-map"
    }).sourceMaps();
}

mix.react("resources/js/app.js", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .react("resources/js/register.js", "public/js")
    .react("resources/js/login.js", "public/js")
    .react("resources/js/add-event.js", "public/js")
    .react("resources/js/edit-event.js", "public/js")
    .react("resources/js/user-detail.js", "public/js")
    .react("resources/js/event-list.js", "public/js")
    .react("resources/js/dropzone.js", "public/js")

    .browserSync({
        host: "localhost",
        port: 3000,
        proxy: {
            target: process.env.APP_URL // Yay! Using APP_URL from the .env file!
        }
    });

// add versioning
mix.version();
