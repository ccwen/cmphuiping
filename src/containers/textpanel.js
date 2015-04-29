var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var ReactPanels=require("react-panels");
var Panel = ReactPanels.Panel;
var FloatingPanel = ReactPanels.FloatingPanel;

var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;

var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Button = ReactPanels.Button;
var Footer = ReactPanels.Footer;
var action=require("../actions/panel");

var ToggleButton = ReactPanels.ToggleButton;
var E=React.createElement;
var update=React.addons.update;
var showtab=function(){
	console.log(arguments);
}
var TextPanel=React.createClass({
	mixins:[PureRenderMixin]
	,getInitialState:function() {
		return update(this.props,{$merge:{buttons:this.panelButtons(true),toolbars:false}});
	}
	,closeTab:function(){
      var selectedIndex = this.refs.panel.getSelectedIndex();
      var tabkey=this.props.tabs[selectedIndex].key;
      action.closeTab(this.props.panelKey,tabkey);
	}
  	,handleToggleToolbars: function (toolbar) {
    	this.setState({toolbars: !this.state.toolbars});
  	}
  	,panelButtons:function() {
  		var toolbars=(!this.state)?false:this.state.toolbars
    	return [
     		 <Button onClick={this.closeTab}>&#10006;</Button>
     		 ,
     		 <ToggleButton title="Toggle Toolbar" active={toolbars} onChange={this.handleToggleToolbars}>
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
		return E(tab.component,{
			key:tab.key,
			title:tab.title,
			panelKey:this.props.panelKey,
			onClone:this.onClone,onResize:this.onResize,
			showToolbar:this.state.toolbars});
	}
	,render:function() {
		return <FloatingPanel ref="panel" {...this.state} selectedIndex={this.props.tabs.length-1} >
		{this.props.tabs.map(this.renderTab)}</FloatingPanel>;
	}
})
module.exports=TextPanel;