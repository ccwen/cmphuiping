var Reflux=require("reflux");
var firebaseurl=require("./firebaseurl");
var action=require("../actions/jingwen");
var ksanaLayer=require("ksana-layer");
var markupStore=require("./markup");
var documents={};

var jingwenstore=Reflux.createStore({
	listenables : action
	,init : function() {
		this.firebase=firebaseurl.jingwen();	
		this.listenTo(markupStore, this.onMarkup);
	}
	,getDocument(dbid) {
		if (!documents[dbid]) documents[dbid]=ksanaLayer.layerdoc.create({name:dbid});
		return documents[dbid];
	}
	,onMarkup:function(markups,dbid,segid) {
		console.log("new markup",markups,dbid,segid);
	}
	,onFetch:function(dbid,segid) {
		var that=this, text="";
		var doc=this.getDocument(dbid);
		if (doc.has(segid)) {
			text=doc.get(segid);
			this.trigger(dbid,segid,text);
			return ;
		}
		this.firebase.child(dbid+'/'+segid).once("value",function(snapshot){
			if (doc.has(segid)) return;
			var raw=snapshot.val();
			text=doc.put(segid,raw.text);
			that.trigger(dbid,segid,text);
		});
	}
});
module.exports=jingwenstore;