exports.index = function(req, res){
 req.session.loginDate = new Date().toString();
 console.log("team2", req.session.loginDate);	
  res.render('team2', {
title: "Learn All 44 Presidents",
sub_channel_name: "Team_Mode",
description: "Game to match and learn the 44 presidents of the United States",
keywords: "44 presidents",
});
};