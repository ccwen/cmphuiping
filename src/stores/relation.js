var React=require("react/addons");
var update=React.addons.update;
var Reflux=require("reflux");
var firebaseurl=require("./firebaseurl");
var userstore=require("./user");
var actions=require("../actions/relation");
var genpushid=require("./genpushid");


var RelationStore=Reflux.createStore({
	listenables:actions
});

module.exports=RelationStore;