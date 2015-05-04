var Reflux=require("reflux");
var actions=require("../actions/segrefcount");
/*
	Store the reference count of dbid/segid
	for attaching callback to firebase
*/
var SegRefCountStore=Reflux.createStore({
	listenables:actions
	,refcount:{}
	,onAdd:function(dbid,segid){
		var key=dbid+"/"+segid;
		var trigger=false;
		if (!this.refcount[key]) {
			this.refcount[key]=0;
			trigger=true;
		}
		this.refcount[key]++;
		if (trigger) this.trigger({added:key},Object.keys(this.refcount));
	}
	,onRemove:function(dbid,segid) {
		var trigger=false;
		var key=dbid+"/"+segid;
		if (!this.refcount[key]) {
			console.error("cannot remove",dbid,segid,"not in used");
			return;
		}
		this.refcount[key]--;	
		if (!this.refcount[key]) {
			delete this.refcount[key];
			trigger=true;
		}
		if (trigger) this.trigger({removed:key},Object.keys(this.refcount));
	}
	,getDbInUse:function() {
		var db={};
		for (var key in this.refcount) {
			inuse[key.split("/")[0]]=true;
		}
		return Object.keys(inuse);
	}
	,getSegInUsed:function(dbid) {
		var segs=[];
		for(var key in this.refcount) {
			var res=key.split("/");
			if (res[0]===dbid) segs.push(res[1]);
		}
		return segs;
	}
	,getRefCount:function(dbid,segid) {
		return this.refcount[dbid+"/"+segid] || 0;
	}
});

module.exports=SegRefCountStore;