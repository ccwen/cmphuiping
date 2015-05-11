var React=require("react");
var ReactPanels=require("react-panels");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;

var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
//var ScrollableTabContent = ReactPanels.addons.ScrollableTabContent;

var Footer = ReactPanels.Footer;

var ToggleButton = ReactPanels.ToggleButton;
var E=React.createElement;
var Reflux=require("reflux");
var store=require("../stores/user");
var action=require("../actions/user");

var loginbuttonstyle={verticalAlign: "middle",cursor:"pointer"};

var GPLUSAPIKEY="AIzaSyDyWCOLvXmoH3GSZXoa6hHE2IsbUS1TGDU";

var UserTab = React.createClass({
  displayName: 'UserTab',
  mixins: [TabWrapperMixin,Reflux.ListenerMixin],
  getInitialState: function () {
    var auth=store.getAuth();
    this.fetchAvatar(auth);
    return {auth:auth,photourl:""};
  }
  ,componentDidMount:function(){
     this.listenTo(store, this.onUserChange);
  }
  ,fetchAvatar:function(auth) {
    if (!auth || !auth.uid) return;
    var that=this;
    var googleuid=auth.uid.substr(7);
    var apiurl="https://picasaweb.google.com/data/entry/api/user/"+googleuid+"?alt=json";
    fetch(apiurl).then(function(res){
      if ( res.status==200)  {
        var reader=res.body.getReader();
        reader.read().then(function(data){
          var json=JSON.parse(String.fromCharCode.apply(null,data.value));
          that.setState({photourl:json.entry.gphoto$thumbnail.$t});
        });
      }
    });
  }
  ,onUserChange:function(auth) {
    this.fetchAvatar(auth);
    this.setState({auth:auth});
  }
  ,handleChangeOnFilter: function () {
    this.filter = this.refs.filter.getDOMNode().value;
    this.forceUpdate();
  },
  handleClick: function (event) {
    var element = event.currentTarget,
      index = parseInt(element.dataset.index);

    if (!isNaN(index)) {
      if (typeof this.props.onClickOnItem === "function") {
        this.props.onClickOnItem(index);
      }
    }
  }
  ,signOut:function() {
    action.logout();
  }
  ,googleSignIn:function() {
    action.login();
  }
  ,renderSignin:function() {
    return ( <p style={{textAlign: "center"}}><img style={loginbuttonstyle}src="img/google-sign-in.png" onClick={this.googleSignIn}></img></p> );
  }
  ,renderUser:function() {
    return (<div style={{textAlign:"center"}}>
        <img style={{borderRadius:"50%"}} src={this.state.photourl}/>
        <br/><span style={{fontSize:"60%"}}>{this.state.auth.google.displayName}</span>
        <br/><button onClick={this.signOut}>Sign Out</button>
      </div>
      );
  }
  ,onresize:function() {

  }
  ,render: function() {
    return (
      <Tab
        icon={this.props.icon}
        title={this.props.title}
        showToolbar={false}
      >
        <Content onResize={this.onresize}>
         {this.state.auth?this.renderUser():this.renderSignin()}
        </Content>
      </Tab>
    );
  }
});
module.exports=UserTab;