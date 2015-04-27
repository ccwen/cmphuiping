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


var DataTab=require("./datatab");
var UserTab=require("./usertab");
var AboutTab=require("./abouttab");

var ControlPanel = React.createClass({
  displayName: 'MyFloatingPanel',

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
    this.forceUpdate();
  },

  render: function() {
    var that = this;

    return (
      E(FloatingPanel, {left: 20, top: 10, width: 280, ref: "systemPanel", theme:"flexbox2"},

    	E(DataTab, {icon: "", title: "Data", showToolbar:false})
      ,E(UserTab, {icon: "", title: "User", showToolbar:that.state.toolbars})
      ,E(AboutTab, {icon: "", title: "About", showToolbar:false})
      )
    );
  }
});
module.exports=ControlPanel;
/*
, 
        React.createElement(MyMainTab, {
          icon: "fa fa-cubes", 
          title: "List of Items", 
          pinned: true, 
          onClickOnItem: that.handleClickOnItem, 
          showToolbar: that.state.toolbars}
        ), 
        that.itemsShown.map(function (item) {
          return (
            React.createElement(MyItemTab, {title: item.name, icon: "fa fa-cube", item: item,
             showToolbar: that.state.toolbars, 
              onClose: that.handleClickOnCloseItemTab, key: item.id})
          );
        })
*/