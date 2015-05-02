var React=require("react/addons");
var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;
var Button = ReactPanels.Button;
var E=React.createElement;
var PureRenderMixin=React.addons.PureRenderMixin;


var SelectionTab = React.createClass({
  displayName: 'SelectionTab'
  ,mixins: [TabWrapperMixin,PureRenderMixin]
  ,getInitialState: function () {
    return {};
  }
  ,propTypes:{
  }
  ,onSelect:function(tocid,tocnode,n,toc) {
    console.log('selected',arguments)
  }
  ,render: function() {
    return (
      <Tab ref="tab"
        icon={this.props.icon}
        title={this.props.title}
        showToolbar={this.props.showToolbar}
        showFooter={this.props.showFooter}
        maxContentHeight={400}
      >
        <Toolbar>

        </Toolbar>

        <Content>
          Selection
        </Content>
        <Footer>
        </Footer>
      </Tab>
    );
  }
});


module.exports=SelectionTab;