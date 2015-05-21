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
	,getDocument:function(dbid) {
		if (!documents[dbid]) documents[dbid]=layerDoc.create({name:dbid});
		return documents[dbid];
	}
	,onMarkup:function(mutation,dbid,segid,markups) {
		var doc=this.getDocument(dbid);
		if (doc.has(segid)) {
			var text=doc.get(segid);
			this.trigger(dbid,segid,text,markups,doc.getTrait(segid).seq);
		}
	}
	,findSeq:function(dbid,seq) {
		/** future improvement is to get segid order by seq, 
		but the component doesn't provide shallow fetch */
		var doc=this.getDocument(dbid);
		var segnames=doc.segnames;
		for (var i=0;i<segnames.length;i++) {
			var trait=doc.getTrait(segnames[i]);
			if (trait.seq===seq) return segnames[i];
		}
		return null;
	}
	,findSegBySeq:function(dbid,seq,cb) {
		var segid=this.findSeq(dbid,seq);
		if (segid) {
			cb(segid);
			return;
		}
		this.firebase.child(dbid).orderByChild("seq").equalTo(seq).once("value",function(snapshot){
			var o=snapshot.val();
			var segid=null;
			if (o) segid=Object.keys(o)[0];
			cb(segid);
		});
	}
	,onFetch:function(dbid,segid) {
		var that=this, text="";
		var doc=this.getDocument(dbid);
		if (doc.has(segid)) {
			text=doc.get(segid);
			var seq=doc.getTrait(segid).seq;
			var markups=markupStore.getMarkups(dbid,segid,seq);
			if (markups) {
				this.trigger(dbid,segid,text,markups,seq);
			} else {
				//markupStore will trigger when markups are fetched
			}
			return ;
		}
		this.firebase.child(dbid+'/'+segid).once("value",function(snapshot){
			if (doc.has(segid)) return;

			var raw=snapshot.val();
			text=doc.put(segid,raw.text,{seq:raw.seq});

			var markups=markupStore.getMarkups(dbid,segid,raw.seq);
			if (markups) {
				that.trigger(dbid,segid,text,markups,raw.seq);
			} else {
				//markupStore will trigger when markups are fetched
			}

		});
	}
});
module.exports=jingwenstore;