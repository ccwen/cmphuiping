var React=require("react/addons");
var Reflux=require("reflux");
var ReactPanels=require("react-panels");
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
var markupAction=require("../actions/markup");
var selectionStore=require("../stores/selection");
var MultiSelectView=require("ksana-layer-react").MultiSelectView;
var RevisionView=require("ksana-layer-react").RevisionView;
var jingwenStore=require("../stores/jingwen");
var jingwenAction=require("../actions/jingwen");
var TextToolbar=require("../views/texttoolbar");
var TextFooter=require("../views/textfooter");
var segRefCount =require("../actions/segrefcount");
var textrange=require("ksana-layer-react").textrange;

var markupStyleSheets=require("./markupstylesheets");

var TextTab = React.createClass({
  displayName: 'TextTab'
  ,mixins: [TabWrapperMixin,PureRenderMixin
    ,Reflux.listenTo(jingwenStore,"onData")
    ,Reflux.listenTo(selectionStore,"onSelection")]
  ,getInitialState: function () {
    var selections=this.props.selections;
    // for moveCaretOnly to work properly on the first time
    if (!selections||selections.length===0) selections=[[0,0]]; 
    return {sz:1,title:this.props.title,text:""
      ,fontSize:this.props.trait.fontSize || 100
      ,selections:selections
      ,editing:false};
  }
  ,propTypes:{
    trait:React.PropTypes.object.isRequired
  }
  ,onData:function(dbid,segid,text,markups) {
    if (dbid!==this.props.trait.dbid||segid!==this.props.trait.segid) return;
    var markupInRange=textrange.markupInRange(markups,this.state.selections);
    this.setState({text:text, markups:markups, markupInRange:markupInRange,
      title:this.props.trait.dbid+":"+this.props.trait.segid});
  }
  ,componentWillReceiveProps:function(nextProps) {
    if (this.props.trait.dbid!=nextProps.trait.dbid ||
        this.props.trait.segid!=nextProps.trait.segid) {
      segRefCount.remove(this.props.trait.dbid,this.props.trait.segid);
      segRefCount.add(nextProps.trait.dbid,nextProps.trait.segid);
        
      jingwenAction.fetch(nextProps.trait.dbid,nextProps.trait.segid);
    }
  }
  ,componentWillUnmount:function() {
    segRefCount.remove(this.props.trait.dbid,this.props.trait.segid);
  }
  ,componentDidMount:function() {
    segRefCount.add(this.props.trait.dbid,this.props.trait.segid);
    jingwenAction.fetch(this.props.trait.dbid,this.props.trait.segid);
  }
  ,resize:function() {
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
  ,changeTab:function(segid) {
    var dbid=this.props.trait.dbid;
    var tab={component:TextTab,dbid:dbid,segid:segid,title:dbid+":"+segid};
    action.closeAdd(this.props.panelKey,this.props.trait.key,tab);
  }
  ,prevSeg:function() {
    var n=parseInt(this.props.trait.segid);
    if (!n) return;
    n--;
    this.setState({selections:[]});
    this.changeTab(n.toString());
  }
  ,nextSeg:function() {
    if (!this.state.text) return;
    var n=parseInt(this.props.trait.segid);
    n++;
    this.setState({selections:[]});
    this.changeTab(n.toString());
  }
  ,onSelection:function(selections,dbid,segid) {
    var trait=this.props.trait;
    if (dbid!=trait.dbid || segid!=trait.segid) return; //not my business

    this.setState(
      {selections:selections, 
        markupInRange:textrange.markupInRange(this.state.markups,selections)
    });
  }
  ,moveCaretOnly:function(selections) { //moving caret should not do selectionAction.set
    return (selections.length==1 && selections[0][1]==0)
    && (this.state.selections.length==1 && this.state.selections[0][1]==0)
  }
  ,onSelect:function(start,len,text,modifier,selections){
    if (this.state.editing) return true;
    var trait=this.props.trait;
    if (this.moveCaretOnly(selections))return;
    selectionAction.set(trait.dbid,trait.segid,selections);
  }
  ,renderContent:function() {
    if (!this.state.text) return;
    var component=MultiSelectView;
    var color="white",backgroundColor="inherit";
    if (this.state.editing) {
      component=RevisionView;
      color="silver";
      backgroundColor="black";
    }
    return  E(component,{onSelect:this.onSelect
          ,style : {fontSize:this.state.fontSize+"%",color:color,backgroundColor:backgroundColor}
          ,selections :this.state.selections
          ,markups:this.state.markups
          ,markupStyles:markupStyleSheets()
          ,text :this.state.text
          ,showCaret:true });
  }
  ,toggleEdit:function() {
    this.setState({editing:!this.state.editing});
  }
  ,removeMarkup:function() {
    var trait=this.props.trait;
    this.state.markupInRange.map(function(m){
      markupAction.remove(trait.dbid,trait.segid,m);
    });
  }
  ,action:function(act) {
    if (act==="next") this.nextSeg();
    else if (act==="prev") this.prevSeg();
    else if (act==="toggleedit") this.toggleEdit();
    else if (act==="clone") this.cloneTabInNewPanel();
    else if (act==="fontresize") this.fontresize();
    else if (act==="resize") this.resize();
    else if (act==="removeMarkup") this.removeMarkup();
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
          <TextToolbar action={this.action} editing={this.state.editing} markupInRange={this.state.markupInRange}/>
        </Toolbar>

        <Content>
          {this.renderContent()}
        </Content>
        <Footer>
          <TextFooter action={this.action} editing={this.state.editing}/>
        </Footer>
      </Tab>
    );
  }

});
module.exports=TextTab;