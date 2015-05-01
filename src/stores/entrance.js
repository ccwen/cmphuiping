var Reflux=require("reflux");
var firebaseurl=require("./firebaseurl");
var userstore=require("./user");

var Markup=Reflux.createStore({
	init:function() {
		this.listenTo(userstore, this.onUser);
	}
	,onUser:function(authdata) {
		var that=this;
		firebaseurl.entrance(authdata.uid).once("value",function(data){
			that.trigger(data.val());
		});	
	}
});

module.exports=Markup;
