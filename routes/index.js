
/*
 * GET home page.
 */

exports.index = function(req, res){
 req.session.loginDate = new Date().toString();
 console.log("loginDate", req.session.loginDate);	
  res.render('index', { title: 'The Home page. Individual game play.', 
  	sub_channel_name:'home',
 	description:" Game to match and learn the 44 presidents of the United States",
 	keywords:"44 presidents" 
});
};

exports.all = function(req, res){
	console.log("all");
 req.session.loginDate = new Date().toString();
 console.log("all", req.session.loginDate);
  res.render('all', { title: 'Play everyone against everyone.',	sub_channel_name: "All_PLAY_Mode", description: "Game to match and learn the 44 presidents of the United States", keywords: "44 presidents" });
};

exports.team1 = function(req, res){
 req.session.loginDate = new Date().toString();
 console.log("team1", req.session.loginDate);
 res.render('team1', { 
	title: "Learn All 44 Presidents",
	sub_channel_name: "Team_Mode",
	description: "Game to match and learn the 44 presidents of the United States",
	keywords: "44 presidents"
	});
};

exports.team2 = function(req, res){
 req.session.loginDate = new Date().toString();
 console.log("team2", req.session.loginDate);
  res.render('team2', {
title: "Learn All 44 Presidents",
sub_channel_name: "Team_Mode",
description: "Game to match and learn the 44 presidents of the United States",
keywords: "44 presidents"
});
};

exports.r_all = function(req, res){
	console.log("all");
 req.session.loginDate = new Date().toString();
 console.log("r-all", req.session.loginDate);
  res.render('r-all', { title: 'Play everyone against everyone.',	sub_channel_name: "All_PLAY_Mode", description: "Game to match and learn the 44 presidents of the United States", keywords: "44 presidents" });
};

exports.r_team1 = function(req, res){
 req.session.loginDate = new Date().toString();
 console.log("r-team1", req.session.loginDate);
 res.render('r-team1', {
	title: "Learn All 44 Presidents",
	sub_channel_name: "Team_Mode",
	description: "Game to math and learn the 44 presidents of the United States",
	keywords: "44 presidents"
	});
};

exports.r_team2 = function(req, res){
 req.session.loginDate = new Date().toString();
 console.log("r-team2", req.session.loginDate);
  res.render('r-team2', {
title: "Learn All 44 Presidents",
sub_channel_name: "Team_Mode",
description: "Game to match and learn the 44 presidents of the United States",
keywords: "44 presidents"
});
};

exports.responsive = function(req, res){
 req.session.loginDate = new Date().toString();
 console.log("loginDate", req.session.loginDate);	
  res.render('responsive', { title: 'The Home page. Individual game play.', 
  	sub_channel_name:'home responsive',
 	description:" Game to match and learn the 44 presidents of the United States",
 	keywords:"44 presidents" 
});
};