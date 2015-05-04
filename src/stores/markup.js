var React=require("react/addons");
var update=React.addons.update;
var Reflux=require("reflux");
var firebaseurl=require("./firebaseurl");
var userstore=require("./user");
var actions=require("../actions/markup");
var genpushid=require("./genpushid");
/*
	receive new markup from firebase
	jingwen will listen to markup change
*/

var segRefCountStore=require("../stores/segrefcount");

var MarkupStore=Reflux.createStore({
	listenables:actions
	,markups:{}
	,init:function() {
		this.listenTo(segRefCountStore,this.onRefCount);
	}
	,onRefCount:function(add_remove,referencing) {
		console.log(add_remove,referencing);
	}
	,onAdd:function(dbid,segid,trait) {
		var auth=userstore.getAuth();
		var user=auth?auth.uid:"anonymous";
		var markupid=genpushid();
		var markup=update(trait,{$merge:{author:user,id:markupid}});
		var key=dbid+"/"+segid;
		if (!this.markups[key]) this.markups[key]={} ;
		this.markups[key][markupid]=markup;
		this.trigger(this.markups[key],dbid,segid);
		return markup;
	}
	,onRemove:function() {

	}
	,getMarkups:function(db,segid) {
		firebaseurl.markup(db,segid).once(function(data){
			this.trigger(data);	
		});
	}
});

module.exports=MarkupStore;
