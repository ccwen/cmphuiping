var React=require("react/addons");
var Reflux=require("reflux");
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
var PureRenderMixin=React.addons.PureRenderMixin;

var action=require("../actions/panel");
var selectionAction=require("../actions/selection");
var selectionStore=require("../stores/selection");
var MultiSelectView=require("ksana-layer-react").MultiSelectView;
var ReviseView=require("ksana-layer-react").ReviseView;
var jingwenStore=require("../stores/jingwen");
var jingwenAction=require("../actions/jingwen");

var TextTab = React.createClass({
  displayName: 'TextTab'
  ,mixins: [TabWrapperMixin,PureRenderMixin
    ,Reflux.listenTo(jingwenStore,"onData")
    ,Reflux.listenTo(selectionStore,"onSelection")]
  ,getInitialState: function () {
     return {sz:1,title:this.props.title,text:""
      ,fontSize:this.props.trait.fontSize || 100
      ,selections:this.props.selections||[]};
  }
  ,propTypes:{
    trait:React.PropTypes.object.isRequired
  }
  ,onData:function(dbid,segid,text,markups) {
    if (dbid!==this.props.trait.dbid||segid!==this.props.trait.segid) return;
    this.setState({text:text,markups:markups,title:this.props.trait.dbid+":"+this.props.trait.segid});
  }
  ,componentWillReceiveProps:function(nextProps) {
    if (this.props.trait.dbid!=nextProps.trait.dbid ||
       this.props.trait.segid!=nextProps.trait.segid) {
      jingwenAction.fetch(nextProps.trait.dbid,nextProps.trait.segid);  
    }
  }
  ,componentDidMount:function() {
    jingwenAction.fetch(this.props.trait.dbid,this.props.trait.segid);
  }
  ,resize:function(e) {
    var sz=this.state.sz+0.5;
    if (sz>2) sz=1;
    this.props.onResize&&this.props.onResize(sz);
    this.setState({sz:sz});
  }
  ,fontresize:function(e) {
    var fontSize=this.state.fontSize+25;
    if (fontSize>200) fontSize=100;
    this.setState({fontSize:fontSize});
    this.props.trait.fontSize=fontSize;
    action.setTab(this.props.panelKey,this.props.trait.key,this.props.trait);
  }
  ,cloneTabInNewPanel:function() {
    action.add([this.props.trait]);
  }
  ,addTab:function(segid) {
    var dbid=this.props.trait.dbid;
    var tab={component:TextTab,dbid:dbid,segid:segid,title:dbid+":"+segid};
    action.closeAdd(this.props.panelKey,this.props.trait.key,tab);
  }
  ,prevSeg:function() {
    var n=parseInt(this.props.trait.segid);
    if (!n) return;
    n--;
    this.addTab(n);
  }
  ,onSelection:function(dbid,segid,selections) {
    var trait=this.props.trait;
    if (dbid!==trait.dbid || segid!==trait.segid) return; //not my business
    this.setState({selections:selections});
  }
  ,onSelect:function(start,len,text,modifier,selections){
    var trait=this.props.trait;
    selectionAction.set(trait.dbid,trait.segid,selections);
  }
  ,nextSeg:function() {
    if (!this.state.text) return;
    var n=parseInt(this.props.trait.segid);
    n++;
    this.addTab(n);
  }
  ,renderContent:function() {
    if (!this.state.text) return;
    return  <MultiSelectView onSelect={this.onSelect} 
          style={{fontSize:this.state.fontSize+"%",color:"white"}} 
          selections={this.state.selections}
          text={this.state.text} showCaret={true} />
  }
  ,render: function() {
    return (
      <Tab ref="tab"
        icon={this.props.icon}
        title={this.state.title}
        showToolbar={this.props.showToolbar}
        showFooter={this.props.showFooter}
        maxContentHeight={this.props.maxContentHeight}
        maxContentHeight={400}
      >
        <Toolbar>
          <div >
          <button onClick={this.prevSeg}><i className="fa fa-chevron-left"/></button>
          <button title="Open tab in new Panel" onClick={this.cloneTabInNewPanel}><i className="fa fa-files-o"></i></button>          
          <button title="resize" onClick={this.resize}><i className="fa fa-arrows-h"></i></button>
          <button title="change font size" onClick={this.fontresize}><i className="fa fa-font"></i></button>

          <button onClick={this.nextSeg}><i className="fa fa-chevron-right"/></button>          
          </div>
        </Toolbar>

        <Content>
          {this.renderContent()}
        </Content>
        <Footer>
          <button>Text options</button>
        </Footer>
      </Tab>
    );
  }

});
module.exports=TextTab;