var Firebase=require("firebase");
var entrance=function(username) {
	return new Firebase("https://cmphuiping.firebaseio.com/users/_default_/entrance");
}
var markups=function(db,segid) {
	return new Firebase("https://cmphuiping.firebaseio.com/markups/"+db+"/"+segid);
}
var user=function() {
	return new Firebase("https://cmphuiping.firebaseio.com/");	
}
module.exports={entrance:entrance,markups:markups,user:user};