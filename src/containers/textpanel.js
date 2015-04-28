var React=require("react");
var ReactPanels=require("react-panels");
var FloatingPanel = ReactPanels.FloatingPanel;
var Panel = ReactPanels.Panel;

var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;

var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Button = ReactPanels.Button;
var Footer = ReactPanels.Footer;

var ToggleButton = ReactPanels.ToggleButton;
var E=React.createElement;
var showtab=function(){
	console.log(arguments);
}
var TextPanel=React.createClass({
	getInitialState:function() {
		var props=this.props;
		var tabs=[{title:props.panelid+"_0"}];
		return {left:props.left,theme:props.theme,top:props.top,width:props.width,tabClass:props.tabClass
			,buttons:this.panelButtons(true)
			,toolbars:true
			,tabs:tabs
		};

	}
	,onClone:function(original,title) {
		this.state.tabs.push({title:title});
		this.forceUpdate();
	}
	,closeTab:function(){

      var newTabs = this.state.tabs, selectedIndex = this.refs.panel.getSelectedIndex();
      newTabs.splice(selectedIndex, 1);
      this.setState({tabs: newTabs});
      if (this.state.tabs.length===0) {
      	this.props.onPanelClose(this.props.panelid);
      }
	}
  	,handleToggleToolbars: function (toolbar) {
    	this.setState({toolbars: !this.state.toolbars});
  	}
  	,panelButtons:function() {
    	return [
     		 <Button onClick={this.closeTab}>&#10006;</Button>
     		 ,
     		 <ToggleButton title="Toggle Toolbar" active={!!toolbar||this.state.toolbars} onChange={this.handleToggleToolbars}>
     			 ...
     		 </ToggleButton>

    	]
  	}
	,onResize:function(resize) {
		if (resize===1) {
			this.setState({width:this.props.width});
		} else if (resize===2) {
			this.setState({width:this.props.width*1.5});
		} else if (resize===3) {
			this.setState({width:this.props.width*2});
		}
	}
	,renderTab:function(tab,idx) {
		return E(this.props.tabClass,{
			key:idx,
			title:tab.title,
			onClone:this.onClone,onResize:this.onResize,
			showToolbar:this.state.toolbars});
	}
	,render:function() {
		return <FloatingPanel ref="panel" {...this.state} >
		{this.state.tabs.map(this.renderTab)}</FloatingPanel>;
	}
})
module.exports=TextPanel;