exports.all = function(req, res){
	console.log("all");
 req.session.loginDate = new Date().toString();
 console.log("all", req.session.loginDate);
  res.render('all', { title: 'Play everyone against everyone.',	sub_channel_name: "All_PLAY_Mode", description: "Game to match and learn the 44 presidents of the United States", keywords: "44 presidents" });
};

