var React=require("react");
var kse=require("ksana-search");
var ReactPanels=require("react-panels");
var Reflux=require("reflux");
var store=require("./stores/panel");

var markupstore=require("./stores/markup");
var userstore=require("./stores/user");

var action=require("./actions/panel");

var E=React.createElement;
var SystemPanel=require("./panels/systempanel");
var LinkPanel=require("./panels/linkpanel");

var BasePanel = require("./panels/basepanel");
var maincomponent = React.createClass({
  mixins:[,Reflux.ListenerMixin]
  ,getInitialState:function() {
    return {panels:[]};
  }
  ,onBeforeUnload:function() {
    store.saveWorkspace();
  }
  ,componentDidMount:function(){
      window.addEventListener("beforeunload", this.onBeforeUnload);
     this.listenTo(store, this.onStore);
  }
  ,onPanelClose:function(panelid) {
    action.remove(panelid);
  }
  ,onStore:function(panels) {
    this.setState({panels:panels});
  }
  ,renderPanel:function(panel,idx) {
    return <BasePanel {...panel.props} key={panel.key} context={panel} panelKey={panel.key} onPanelClose={this.onPanelClose} />;
  }
  ,render: function() {
    return <div style={{width:"100%",height:"100%",background:"#333333"}}>
      <SystemPanel/>
      <LinkPanel width={280} top={300}/>
      {this.state.panels.map(this.renderPanel)}
    </div>;
  }
});
module.exports=maincomponent;