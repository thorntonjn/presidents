exports.index = function(req, res){
 req.session.loginDate = new Date().toString();
 console.log("loginDate", req.session.loginDate);	
  res.render('allPlay', { title: 'Play as Group.' });
};