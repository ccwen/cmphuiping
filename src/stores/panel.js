var update=require("react/addons").addons.update;
var Reflux=require("reflux");
var actions=require("../actions/panel");
var TextTab=require("../containers/texttab");
var User=Reflux.createStore({
	listenables: actions,
	panels:[]
	,init:function() {
	}
	,getPanel:function(panelkey) {
		var r=this.panels.filter(function(panel){return panel.key===panelkey});
		if (r.length) return r[0];
	}
	,onAddTab:function(panelkey,trait) {
		var panel=this.getPanel(panelkey);
		if (!panel) return;
		panel.props.tabs = update(panel.props.tabs, {$push: [trait]});
		this.trigger(this.panels);
	}
	,onCloseTab:function(panelkey,n) {
		var panel=this.getPanel(panelkey);
		if (!panel) return;
		panel.props.tabs = update(panel.props.tabs, {$splice: [[n,1]]});
		if (panel.props.tabs.length===0) {//remove the panel if no more tab
			var i=this.panels.indexOf(panel);
			this.panels.splice(i,1);
		}
		this.trigger(this.panels);		
	}
	,onAdd:function(name,tabs) {
		var panel={key:Math.random().toString().substr(3,5)};
		var left=310+this.panels.length*50;
		var top=10+this.panels.length*20;
		panel.props={left: left, top: top, width: 300, key: this.panels.length,ref: name , theme:"flexbox"
		,tabs:tabs||[]};
		this.panels.push(panel);
		this.trigger(this.panels);
	},
	onRemove:function(panelkey) {
	    this.panels=this.panels.filter(function(panel){
	      return panel.key!==panelkey ;
	    });
		this.trigger(this.panels);
	}
});

module.exports=User;
