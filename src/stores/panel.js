var Reflux=require("reflux");
var actions=require("../actions/panel");

var User=Reflux.createStore({
	listenables: actions,
	panels:[]
	,init:function() {
	}
	,onAdd:function(name) {
		var panel={};
		var left=Math.round(Math.random()*1500);
		var top=Math.round(Math.random()*800);
		panel.props={left: left, top: top, width: 320, ref: name , theme:"flexbox"};
		this.panels.push(panel);
		this.trigger(this.panels);
	},
	onRemove:function(panel) {
		var i=this.panels.indexOf(panel);
		if (i>-1) this.panels.splice(i,1);
		this.trigger(this.panels);
	}
});

module.exports=User;
