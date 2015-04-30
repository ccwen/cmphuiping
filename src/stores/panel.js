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
	,getTabIdx:function(panel,tabkey) {
		for (var i=0;i<panel.props.tabs.length;i++) {
			if (panel.props.tabs[i].key===tabkey) return i;
		}
		return -1;
	}
	,getPanelTabIdx:function(panelkey,tabkey) {
		var panel=this.getPanel(panelkey);
		if (!panel) return null;
		var tabIdx=this.getPanelTabIdx(panel,tabkey);
		return {panel:panel,tabIdx:tabIdx};
	}
	,onSetActiveTab:function(panelkey,tabkey){
		var res=this.getPanelTabIdx(panelkey,tabkey);
		if (!res) return;
		res.panel.setSelectedIndex(res.tabIdx);
	}
	,createUniqueTabKey:function(tabs) {
		return tabs.map(function(tab){
			if (!tab.key) tab.key='T'+Math.random().toString().substr(3,6);
			return tab;
		});
	}
	,onAddTab:function(panelkey,tab) {
		var panel=this.getPanel(panelkey);
		if (!panel) return;
		this.createUniqueTabKey([tab]);
		panel.props.tabs = update(panel.props.tabs, {$push: [tab]});
		this.trigger(this.panels);
	}
	,onCloseTab:function(panelkey,tabkey) {
		var panel=this.getPanel(panelkey);
		if (!panel) return;
		var tabidx=this.getTabIdx(panel,tabkey);
		if (tabidx===-1) return;

		panel.props.tabs = update(panel.props.tabs, {$splice: [[tabidx,1]]});
		if (panel.props.tabs.length===0) {//remove the panel if no more tab
			var i=this.panels.indexOf(panel);
			this.panels.splice(i,1);
		}
		this.trigger(this.panels);
	}
	,onAdd:function(tabs) {
		var panel={key:'P'+Math.random().toString().substr(3,6)};
		var left=310+this.panels.length*50;
		var top=10+this.panels.length*20;
		tabs=this.createUniqueTabKey(tabs||[]);
		panel.props={left: left, top: top, width: 300, theme:"flexbox",tabs:tabs};
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
