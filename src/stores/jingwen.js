var Reflux=require("reflux");
var firebaseurl=require("./firebaseurl");
var action=require("../actions/jingwen");
var layerDoc=require("ksana-layer").layerdoc;
var markupStore=require("./markup");
var documents={};

var jingwenstore=Reflux.createStore({
	listenables : action
	,init : function() {
		this.firebase=firebaseurl.jingwen();	
		this.listenTo(markupStore, this.onMarkup);
	}
	,getDocument(dbid) {
		if (!documents[dbid]) documents[dbid]=layerDoc.create({name:dbid});
		return documents[dbid];
	}
	,onMarkup:function(mutation,dbid,segid,markups) {
		var doc=this.getDocument(dbid);
		if (doc.has(segid)) {
			var text=doc.get(segid);
			this.trigger(dbid,segid,text,markups);
		}
	}
	,onFetch:function(dbid,segid) {
		var that=this, text="";
		var doc=this.getDocument(dbid);
		if (doc.has(segid)) {
			text=doc.get(segid);
			var markups=markupStore.getMarkups(dbid,segid);
			if (markups) this.trigger(dbid,segid,text,markups);
			return ;
		}
		this.firebase.child(dbid+'/'+segid).once("value",function(snapshot){
			if (doc.has(segid)) return;

			var raw=snapshot.val();
			text=doc.put(segid,raw.text);

			var markups=markupStore.getMarkups(dbid,segid);
			if (markups) {
				that.trigger(dbid,segid,text,markups);
			} else {
				//markupStore will trigger when markups are fetched
			}

		});
	}
});
module.exports=jingwenstore;