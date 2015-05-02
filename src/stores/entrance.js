var Reflux=require("reflux");
var firebaseurl=require("./firebaseurl");
var userstore=require("./user");
var mockdata=require("../../mockdata");
var Markup=Reflux.createStore({
	init:function() {
		this.listenTo(userstore, this.onUser);
	}
	,onUser:function(authdata) {
		var that=this;
		if (!authdata && mockdata.entrance) {
			this.trigger(mockdata.entrance);
			return;
		}
		firebaseurl.entrance(authdata.uid).once("value",function(data){
			that.trigger(data.val());
		});	
	}
});

module.exports=Markup;
