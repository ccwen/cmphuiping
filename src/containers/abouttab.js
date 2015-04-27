var React=require("react");
var ReactPanels=require("react-panels");
var FloatingPanel = ReactPanels.FloatingPanel;

var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;

var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;

var ToggleButton = ReactPanels.ToggleButton;
var E=React.createElement;


var AboutTab = React.createClass({
  displayName: 'AboutTab',
  mixins: [TabWrapperMixin],

  getInitialState: function () {
    return {};
  },
  render: function() {
    var self = this,
      index = -1;

    return (
      <Tab
        icon={this.props.icon}
        title={this.props.title}
        showToolbar={false}
      >

        <Content>
          Chinese Meaning Processing System
        </Content>
      </Tab>
    );
  }

});
module.exports=AboutTab;
