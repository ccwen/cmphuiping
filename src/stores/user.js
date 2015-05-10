var Reflux=require("reflux");
var firebaseurl=require("./firebaseurl");
var actions=require("../actions/user");


var User=Reflux.createStore({
	listenables: actions
	,auth:null
	,init:function() {
		this.rootRef = firebaseurl.user();
		this.auth=this.rootRef.getAuth();
		if (this.auth) {
			var that=this;
			setTimeout(function(){
				that.trigger(that.auth);
			},500)
		}
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
		return this.auth||{};
	}
});

module.exports=User;
