module.exports = function(app)
{
    app.get('/', function(req, res) {
            res.render('chat.html')
          });
    app.get('/about', function(req, res) {
            res.render('about.html');
          });
}
