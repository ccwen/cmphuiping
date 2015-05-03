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
var tabtype=require("../tabs/tabtype");

var showtab=function(){
	console.log(arguments);
}
var BasePanel=React.createClass({
	mixins:[PureRenderMixin]
	,getInitialState:function() {
		return update(this.props,{$merge:{
				buttons:this.panelButtons(true)
				,aux:3
				,width:this.props.widthZoom*300
			}
		});
	}
	,closeTab:function(){
      var selectedIndex = this.refs.panel.getSelectedIndex();
      var tabkey=this.props.tabs[selectedIndex].key;
      action.closeTab(this.props.panelKey,tabkey);
	}
  	,handleToggle: function (toolbar) {
  		var aux=this.state.aux - 1;
  		if (aux<0) aux=3;
    	this.setState({aux:aux});
  	}
  	,panelButtons:function() {
  		var toolbar=(!this.state)?false:this.state.aux&1==1;
  		var footer=(!this.state)?false:this.state.aux&2==2;
    	return [
     		 <Button onClick={this.closeTab}><span>　</span><i className="fa fa-close"></i><span>　</span></Button>
     		 ,
     		 <ToggleButton title="Toggle Toolbar" active={toolbar} onChange={this.handleToggle}>
     		 <span>　</span><i className="fa fa-bars"></i><span>　</span>
     		 </ToggleButton>
    	]
  	}
  	,onBoundsChange:function(bound) {
		this.props.context.props.left=bound.left;
		this.props.context.props.top=bound.top;
		action.set(this.props.panelKey,this.props.context.props);
  	}
	,onResize:function(zoom) {
		this.props.context.props.widthZoom=zoom;
		this.setState({width:zoom*300});
		action.set(this.props.panelKey,this.props.context.props);
	}
	,renderTab:function(tab,idx) {
		var component=tabtype.componentbyType(tab.type);
		return E(component,{
			key:tab.key,
			title:tab.title,
			trait:tab,
			panelKey:this.props.panelKey,
			onClone:this.onClone,
			onResize:this.onResize,
			showToolbar:(this.state.aux&1)==1,
			showFooter:(this.state.aux&2)==2});
	}
	,render:function() {
		return <FloatingPanel onBoundsChange ={this.onBoundsChange } ref="panel" {...this.state} selectedIndex={this.props.tabs.length-1} >
		{this.props.tabs.map(this.renderTab)}</FloatingPanel>;
	}
})
module.exports=BasePanel;