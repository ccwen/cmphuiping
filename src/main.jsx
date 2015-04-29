var React=require("react");
var kse=require("ksana-search");
var SystemPanel=require("./containers/systempanel");
var ReactPanels=require("react-panels");
var Reflux=require("reflux");
var store=require("./stores/panel");
var action=require("./actions/panel");

var E=React.createElement;
var TextPanel = require("./containers/textpanel");
var maincomponent = React.createClass({
  mixins:[,Reflux.ListenerMixin]
  ,getInitialState:function() {
    return {panels:[]};
  }
  ,componentDidMount:function(){
     this.listenTo(store, this.onStore);
  }
  ,onPanelClose:function(panelid) {
    action.remove(panelid);
  }
  ,onStore:function(panels) {
    this.setState({panels:panels});
  }
  ,renderPanel:function(panel,idx) {
    return <TextPanel {...panel.props} key={panel.key} context={panel} panelKey={panel.key} onPanelClose={this.onPanelClose} />;
  }
  ,render: function() {
    return <div style={{width:"100%",height:"100%",background:"#333333"}}>
      <SystemPanel/>
      {this.state.panels.map(this.renderPanel)}
    </div>;
  }
});
module.exports=maincomponent;