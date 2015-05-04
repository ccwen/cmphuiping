var React=require("react/addons");
var Reflux=require("reflux");
var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;
var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;
var ToggleButton = ReactPanels.ToggleButton;
var Button = ReactPanels.Button;
var PureRenderMixin=React.addons.PureRenderMixin;
var E=React.createElement;
var selectionStore=require("../stores/selection");
var selectionAction=require("../actions/selection");
var Ranges=require("../views/ranges");
var NewRelation=require("../views/newrelation");
var SelectionTab = React.createClass({
  displayName: 'SelectionTab'
  ,mixins: [TabWrapperMixin,Reflux.listenTo(selectionStore,"onSelection")]
  ,getInitialState: function () {
    return {selections:{}};
  }
  ,onSelection:function(sels,dbid) {
    if (dbid!=="*") return;
    this.setState({selections:sels});
  }
  ,propTypes:{
  }
  ,onSelect:function(tocid,tocnode,n,toc) {
    console.log('selected',arguments)
  }
  ,renderSelections:function(sels){
    var out=[];
    for (var i in sels) {
      var r=i.split("/");
      out.push( E(Ranges, {key:i, dbid:r[0], segid:r[1], ranges:sels[i]} ));
    }
    return out;
  }
  ,clearAllSelection:function() {
    selectionAction.clearAll();
  }
  ,render: function() {
    var hasrange=selectionStore.rangeCount(this.props.selections)>0;
    return (
      <Tab ref="tab"
        icon={this.props.icon}
        title={this.props.title}
        showToolbar={this.props.showToolbar}
        showFooter={this.props.showFooter}
        maxContentHeight={400}
      >
        <Toolbar>
          <button title="Clear Selection" disabled={!hasrange}
          onClick={this.clearAllSelection}><i className="fa fa-times"/></button>
        </Toolbar>

        <Content>
          {this.renderSelections(this.state.selections)}
        </Content>
        <Footer><NewRelation selections={this.state.selections}/></Footer>
      </Tab>
    );
  }
});


module.exports=SelectionTab;