const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("/news/trending", {
      target: "https://api.coronatracker.com/news/trending",
      changeOrigin: true
    })
  );
};
