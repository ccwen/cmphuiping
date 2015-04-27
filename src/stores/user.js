var Reflux=require("reflux");
var Firebase=require("firebase");
var url="https://ksana.firebaseio.com";
var actions=require("../actions/user");

var User=Reflux.createStore({
	listenables: actions,
	init:function() {
		this.rootRef = new Firebase(url);
		this.auth=this.rootRef.getAuth();
	}
	,onLogin:function() {
		var that=this;
		this.rootRef.authWithOAuthPopup("google", function(error, authData) {
			if (error) {
		  		console.log("Login Failed!", error);
		  	} else {
		  		that.auth=authData;
		  		that.trigger(authData);
		  	}
		});
	},
	onLogout:function() {
		this.rootRef.unauth();
		this.trigger(null);
	},
	getAuth:function() {
		return this.auth;
	}
});

module.exports=User;
