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


var SelectionTab=require("../tabs/selectiontab");
var LinkedTab=require("../tabs/linkedtab");
var PNodeTab=require("../tabs/pnodetab");

var LinkPanel = React.createClass({
  displayName: 'LinkPanel',

  getInitialState: function () {
    this.itemsShown = [];
    return {toolbar: true};
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
  handleToggleToolbar: function () {
      this.setState({toolbar: !this.state.toolbar});
  },
  handleToggleToolbars: function () {
    this.setState({toolbar: !this.state.toolbar});
    this.forceUpdate();
  },
  panelButtons:function() {
    return [
      <ToggleButton title="Toggle Toolbar" active={this.state.toolbar} onChange={this.handleToggleToolbar}>
      <span>　</span><i className="fa fa-bars"></i><span>　</span>
      </ToggleButton>
    ]
  },
  render: function() {
    var that = this;

    return (
      E(FloatingPanel, {left: 10, top: this.props.top||300, width: this.props.width||280, ref: "LinkPanel", 
              theme:"flexbox2",buttons:this.panelButtons()},

    	E(SelectionTab, {icon: "", title: "Sel", showToolbar:that.state.toolbar})
      ,E(LinkedTab, {icon: "", title: "Link", showToolbar:that.state.toolbar})
      ,E(PNodeTab, {icon: "", title: "PNode", showToolbar:that.state.toolbar})
      )
    );
  }
});
module.exports=LinkPanel;