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
	,admin:[]
	,init:function() {
		this.listenTo(segRefCountStore,this.onRefCount);
	}
	,updateMarkupsFromSnapshot:function(snapshot,remove) {
		var markup=snapshot.val();
		var dbid=snapshot.ref().parent().parent().key();
		var segid=snapshot.ref().parent().key();

		var key=dbid+"/"+segid;
		var mkey=snapshot.key();
		var markups=this.markups[key];
		if (!markups) return null;

		if (remove) {
			delete markups[mkey];
			markups=this.markups[key]=update(this.markups[key],{$set:markups});
		} else {
			var newmarkup={};
			newmarkup[mkey]=markup;
			markups=update(markups,{$merge:newmarkup});
		}
		
		return {markup:markup,markups:markups,dbid:dbid,segid:segid};
	}
	,markupAdded:function(childSnapshot,prevChildName) {
		var r=this.updateMarkupsFromSnapshot(childSnapshot);
		if (!r) return;
		//console.log("markup added",r.markup,r.dbid,r.segid);
		this.trigger({added:r.markup},r.dbid,r.segid,this.toArray(r.markups));
	}
	,markupRemoved:function(childSnapshot) {
		var r=this.updateMarkupsFromSnapshot(childSnapshot,"remove");
		if (!r) return;
		//console.log("markup removed",r.markup,r.dbid,r.segid);
		this.trigger({removed:r.markup},r.dbid,r.segid,this.toArray(r.markups));
	}
	,markupChanged:function(childSnapshot) {
		var r=this.updateMarkupsFromSnapshot(childSnapshot);
		if (!r) return;
		//console.log("markup changed",r.markup,r.dbid,r.segid);
		this.trigger({changed:r.markup},r.dbid,r.segid,this.toArray(r.markups));
	}
	,onRefCount:function(act,referencing) {
		//console.log('refcount',act,referencing);
		if (act.added) {
			firebaseurl.markups(act.added).on("child_added",this.markupAdded);
			firebaseurl.markups(act.added).on("child_removed",this.markupRemoved);
			firebaseurl.markups(act.added).on("child_changed",this.markupChanged);
		}
		if (act.removed) {
			firebaseurl.markups(act.removed).off();
		}
	}
	,toArray:function(markups) {
		var out=[];
		for (var i in markups) {
			out.push(markups[i]);
		}
		return out;
	}
	,onAdd:function(dbid,segid,trait) {
		var auth=userstore.getAuth();
		var user=auth?auth.uid:"anonymous";
		var key=dbid+"/"+segid;

		var ref=firebaseurl.markups(key).push();
		var markupid=ref.key();

		var markup=update(trait,{$merge:{author:user,id:markupid}});
		if (!this.markups[key]) this.markups[key]={} ;

		ref.set(markup);
		return markup;
	}
	,canEdit:function(markup) {
		var auth=userstore.getAuth();
		var user=auth?auth.uid:"anonymous";
		if (this.admin.indexOf(user)>-1 || markup.user===user) return true;
	}
	,onChange:function(dbid,segid,markup) {
		if (!this.canEdit(markup))return -1;

		var key=dbid+"/"+segid;
		var ref=firebaseurl.markups(key).child(markup.id);
		ref.set(markup);
	}
	,onRemove:function(dbid,segid,markup) {
		var key=dbid+"/"+segid;
		if (!this.canEdit(markup))return -1;
		var markups=this.markups[key];
		if (!markups) {
			console.error("not loaded");
			return -2;
		}
		if (!markups[markup.id]) {
			console.error("not such markup",markup);
			return -3;
		}
		var ref=firebaseurl.markups(key).child(markup.id).remove();
		return 0;
	}
	,getMarkups:function(dbid,segid) {
		var key=dbid+"/"+segid;
		var markups=this.markups[key];
		if (markups) {
			return this.toArray(markups);
		}

		var that=this;
		firebaseurl.markups(key).once("value",function(data){
			that.markups[key]=data.val() || {};
			var markups=that.toArray(that.markups[key]);
			//console.log('markups of',dbid,segid,markups);
			that.trigger({},dbid,segid,markups);
		});

	}
});

module.exports=MarkupStore;
