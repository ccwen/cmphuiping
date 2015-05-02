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

var panelActions=require("../actions/panel");
var treetoc=require("ksana2015-treetoc");
var TreeToc=treetoc.component;

var firebaseurl=require("../stores/firebaseurl");
var action=require("../actions/panel");

var mockdata=require("../../mockdata/index");


var TocTab = React.createClass({
  displayName: 'TocTab'
  ,mixins: [TabWrapperMixin,PureRenderMixin]
  ,getInitialState: function () {
    return {sz:1,toc:[]};
  }
  ,propTypes:{
  	trait:React.PropTypes.object.isRequired
  }
  ,componentWillMount:function() {
    var path=this.props.trait.path;

    if (mockdata[this.props.trait.path]) {
      this.setState({toc:treetoc.buildToc(mockdata[this.props.trait.path])});
      console.log("using mock data")
    } else {
      firebaseurl.rootpath(this.props.trait.path).once("value",function(data){
        this.setState({toc:treetoc.buildToc(data.val())});
      }.bind(this));
    }
  }
  ,resize:function(e) {
    var sz=this.state.sz+1;
    if (sz>3) sz=1;
    this.props.onResize&&this.props.onResize(sz);
    this.setState({sz:sz});
  }
  ,addTab:function() {
    var key='T'+Math.random().toString().substr(3,5);
    var tab={key:key,title:key,component:TextTab};
    action.addTab(this.props.panelKey,tab);
  }
  ,onSelect:function(tocid,tocnode,n,toc) {
    console.log('selected',arguments)
  }
  ,openlink:function(e) {
    var segid=e.target.dataset.segid;
    var dbid=e.target.dataset.dbid;
    var tabtype=require("./tabtype");
    var component=tabtype.componentbyType("text");
    var tab={component:component,dbid:dbid,segid:segid,title:dbid+":"+segid};
    panelActions.addTab(this.props.panelKey,tab);
  }
  ,renderLink:function(links) {
    var out=[];
    for (var dbid in links) {
      out.push(
        <span onClick={this.openlink} className="nodelink" key={dbid} data-dbid={dbid} data-segid={links[dbid]}>
        {" "+dbid+":"+links[dbid]}
        </span>
      )
    }
    return out;
  }
  ,onNode:function(toc,selected,n){
    if (toc.link && selected) {
      return <span>{this.renderLink(toc.link)}</span>
    }
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
          <div >
          <button title="resize" onClick={this.resize}><i className="fa fa-arrows-h"></i></button>
          </div>
        </Toolbar>

        <Content>
            <TreeToc opts={{tocstyle:this.props.trait.tocstyle,onNode:this.onNode}}
              data={this.state.toc} tocid={this.props.trait.key} 
            onSelect={this.onSelect}/>
        </Content>
        <Footer>
          <button>Next</button>
        </Footer>
      </Tab>
    );
  }
});


module.exports=TocTab;