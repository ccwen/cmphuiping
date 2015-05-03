var Reflux=require("reflux");
var actions=require("../actions/selection");
var Selection=Reflux.createStore({
	listenables: actions
	,init:function() {
	}
	,selections:{}
	,broadcast:function() {
		var sels=this.selections;
		for (var key in sels) {
			var res=key.split("/");
			this.trigger(res[0],res[1],sels[key]);
			if (!sels[key].length) {
				delete sels[key];
			}
		}
		this.trigger("*",sels);
	}
	,onSet:function(dbid,segid,selections) {
		this.selections[dbid+"/"+segid]=selections;
		this.broadcast();
	}
	,onClearAll:function(dbid,segid) {
		if (!dbid) {
			for (var i in this.selections) this.selections[i]=[];
		} else {
			this.selections[dbid+"/"+segid]=[];			
		}
		this.broadcast();
	}
});

module.exports=Selection;
