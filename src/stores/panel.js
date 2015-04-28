var Reflux=require("reflux");
var actions=require("../actions/panel");
var TextTab=require("../containers/texttab");
var User=Reflux.createStore({
	listenables: actions,
	panels:[]
	,init:function() {
	}
	,onAdd:function(name) {
		var panel={id:Math.random().toString().substr(3,5)};
		var left=310+this.panels.length*50;
		var top=10+this.panels.length*20;
		panel.props={left: left, top: top, width: 300, key: this.panels.length,ref: name , theme:"flexbox"
		,tabClass:TextTab};
		this.panels.push(panel);
		this.trigger(this.panels);
	},
	onRemove:function(panelid) {

	    this.panels=this.panels.filter(function(panel){
	      return panel.id!==panelid ;
	    });
		this.trigger(this.panels);
	}
});

module.exports=User;
