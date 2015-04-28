var React=require("react");
var ReactPanels=require("react-panels");
var FloatingPanel = ReactPanels.FloatingPanel;
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;
//var Button = ReactPanels.Button;
var E=React.createElement;


var EmptyTab = React.createClass({
  displayName: 'EmptyTab',
  mixins: [TabWrapperMixin],

  getInitialState: function () {
     return {sz:1};
  },
  resize:function(e) {
    var sz=this.state.sz+1;
    if (sz>3) sz=1;
    this.props.onResize&&this.props.onResize(sz);
    this.setState({sz:sz});
  }
  ,cloneTab:function() {
    var title=Math.random().toString().substr(3,3);
    this.props.onClone && this.props.onClone(this,title);
  }
  ,render: function() {
    return (
      <Tab ref="tab"
        icon={this.props.icon}
        title={this.props.title}
        showToolbar={this.props.showToolbar}
      >
        <Toolbar>
          <div >
          <button onClick={this.cloneTab}>+</button>          
          <button onClick={this.resize}>sz</button>
          </div>
        </Toolbar>

        <Content>
          <ul className="items-list">
            content {Math.random().toString().substr(3,5)}
          </ul>
        </Content>

    
      </Tab>
    );
  }

});
module.exports=EmptyTab;