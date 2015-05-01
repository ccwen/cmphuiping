var React=require("react");
var ReactPanels=require("react-panels");
var FloatingPanel = ReactPanels.FloatingPanel;
var Reflux=require("reflux");
var Tab = ReactPanels.Tab;
var TabWrapperMixin = ReactPanels.Mixins.TabWrapper;

var Toolbar = ReactPanels.Toolbar;
var Content = ReactPanels.Content;
var Footer = ReactPanels.Footer;

var ToggleButton = ReactPanels.ToggleButton;
var E=React.createElement;

var panelActions=require("../actions/panel");

var entracestore=require("../stores/entrance");
var tabtype=require("./tabtype");

var DataTab = React.createClass({
  displayName: 'DataTab',
  mixins: [TabWrapperMixin,Reflux.listenTo(entracestore,"onEntrace")]

  ,getInitialState: function () {
    this.tofind = "";
    return {entrance:[]};
  }
  ,onEntrace:function(data) {
    this.setState({entrance:data});
  }
  ,handleChangeOnSearch: function () {
    this.tofind = this.refs.search.getDOMNode().value;
    this.forceUpdate();
  }
  ,handleClick: function (event) {
    var element = event.currentTarget,
      index = parseInt(element.dataset.index);

    if (!isNaN(index)) {
      if (typeof this.props.onClickOnItem === "function") {
        this.props.onClickOnItem(index);
      }
    }
  }
  ,openPanel:function(e) {
    var path=e.target.dataset.path;
    var title=e.target.innerHTML;
    var type=e.target.dataset.type;
    var component=tabtype.componentbyType(type);
    if(!component) {
       console.error("invalid compoent type",type ,"for ",title);
       return;
    }
    var tab={component:component,path:path,title:title};
    panelActions.add([tab]);
  }
  ,renderEntrace:function(entrance,idx) {
    return ( 
      <button style={{fontSize:"100%"}} key={idx} data-path={entrance.path} data-type={entrance.type} onClick={this.openPanel}>
        {entrance.title}
      </button> 
    );
  }
  ,render: function() {

    return (
      <Tab
        icon={this.props.icon}
        title={this.props.title}
        showToolbar={this.props.showToolbar}
      >
        <Toolbar>
          <input type="text"
            ref="search"
            placeholder="Search..."
            style={{width: "100%"}}
            onChange={this.handleChangeOnSearch}
          />
        </Toolbar>

        <Content>
          {this.state.entrance.map(this.renderEntrace)}
        </Content>
      </Tab>
    );
  }

});
module.exports=DataTab;
/*
            {$_data.map(function (item) {
              ++index;
              if (self.filter.length && item.name.indexOf(self.filter) == -1 && item.type.indexOf(self.filter) == -1)
                return null;
              return (<li key={index} data-index={index} onClick={self.handleClick}><strong>[{item.type}]</strong> {item.name}</li>);
            })}

*/