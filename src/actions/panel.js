var Reflux=require("reflux");
var actions=Reflux.createActions(
	["add","remove","set","addTab","closeTab","setTab","setActiveTab","closeAdd","bringTop"]);
module.exports=actions;