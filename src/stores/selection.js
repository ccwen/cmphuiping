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
			this.trigger(sels[key],res[0],res[1]);

			if (!sels[key]) delete sels[key];
		}
		this.trigger(sels,"*");
	}
	,onSet:function(dbid,segid,selections) {
		this.selections[dbid+"/"+segid]=selections;
		this.broadcast();
	}
	,rangeCount:function(sels) {
		if (!sels) sels=this.selections;
		var count=0;
		for (var i in sels) {
			count+=sels[i].filter(function(m){ return !!m[1]}).length;
		}
		return count;
	}	
	,onClear:function(dbid,segid) {
		if (!dbid) {
			for (var i in this.selections) this.selections[i]=[];
		} else {
			this.selections[dbid+"/"+segid]=[];			
		}
		this.broadcast();
	}
});

module.exports=Selection;
