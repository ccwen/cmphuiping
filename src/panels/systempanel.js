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


var DataTab=require("../tabs/datatab");
var UserTab=require("../tabs/usertab");
var AboutTab=require("../tabs/abouttab");

var SystemPanel = React.createClass({
  displayName: 'SystemPanel',

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
      E(FloatingPanel, {left: 10, top: 10, width: 280, ref: "systemPanel", 
              theme:"flexbox2",buttons:this.panelButtons()},

    	E(DataTab, {icon: "fa fa-database", title: "Data", showToolbar:that.state.toolbars})
      ,E(UserTab, {icon: "fa fa-user", title: "User", showToolbar:that.state.toolbars})
      ,E(AboutTab, {icon: "fa fa-info", title: "About", showToolbar:that.state.toolbars})
      )
    );
  }
});
module.exports=SystemPanel;
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