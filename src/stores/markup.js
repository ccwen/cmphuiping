var Reflux=require("reflux");
var firebaseurl=require("./firebaseurl");
var userstore=require("./user");

var Markup=Reflux.createStore({
	init:function() {
	
	}
	,getMarkups:function(db,segid) {
		firebaseurl.markup(db,segid).once(function(data){
			this.trigger(data);	
		});
	}
});

module.exports=Markup;
