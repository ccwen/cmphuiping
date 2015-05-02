var React=require("react");
var ReactPanels=require("react-panels");
var FloatingPanel = ReactPanels.FloatingPanel;
var Panel = ReactPanels.Panel;

var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;

var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;

var Footer = ReactPanels.Footer;

var ToggleButton = ReactPanels.ToggleButton;
var E=React.createElement;


var SelectionTab=require("./selectiontab");
var LinkedTab=require("./linkedtab");

var LinkPanel = React.createClass({
  displayName: 'LinkPanel',

  getInitialState: function () {
    this.itemsShown = [];
    return {toolbars: true};
  },

  handleClickOnItem: function (itemIndex) {
    this.refs.myPanel.setSelectedIndex(this.itemsShown.push($_data[itemIndex]));
    this.forceUpdate();
  },

  handleClickOnCloseItemTab: function (itemIndex) {
    this.itemsShown.splice(itemIndex - 1, 1);
    this.refs.myPanel.setSelectedIndex(0);
    this.forceUpdate();
  },
  handleToggleToolbars: function () {
      this.setState({toolbars: !this.state.toolbars});
  },
  handleToggleToolbars: function () {
    this.setState({toolbars: !this.state.toolbars});
    this.forceUpdate();
  },
  panelButtons:function() {
    return [
      <ToggleButton title="Toggle Toolbar" active={this.state.toolbars} onChange={this.handleToggleToolbars}>
      <span>　</span><i className="fa fa-bars"></i><span>　</span>
      </ToggleButton>
    ]
  },
  render: function() {
    var that = this;

    return (
      E(FloatingPanel, {left: 10, top: this.props.top||300, width: this.props.width||280, ref: "LinkPanel", 
              theme:"flexbox2",buttons:this.panelButtons()},

    	E(SelectionTab, {icon: "", title: "Selection", showToolbar:that.state.toolbars})
      ,E(LinkedTab, {icon: "", title: "Linked", showToolbar:that.state.toolbars})
      )
    );
  }
});
module.exports=LinkPanel;