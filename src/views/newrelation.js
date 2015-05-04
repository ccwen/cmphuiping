var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;
var selectionStore=require("../stores/selection");
var selectionAction=require("../actions/selection");
var markupAction=require("../actions/markup");

var NewSelection=React.createClass({
  mixins: []
  ,getInitialState: function () {
    return {};
  }
  ,propTypes:{
    selections:React.PropTypes.object.isRequired
  }
  ,createMarkup:function() {
  	var sels=this.props.selections;
  	var key=Object.keys(sels)[0];
  	var dbid=key.split("/")[0], segid=key.split("/")[1];
  	var range=sels[key][0];
  	markupAction.add(dbid,segid,{s:range[0],l:range[1],type:"test"});
  	selectionAction.clear();
  }
  ,render:function(){
    var rangeCount=selectionStore.rangeCount(this.props.selections);

    return <div>
        <select>
          <option key={1}>1</option>
          <option key={2}>2</option>
        </select>
        <button disabled={rangeCount<2}><i className="fa fa-link"/></button>
        <button disabled={rangeCount!==1} onClick={this.createMarkup}><i className="fa fa-comment-o"/></button>
      </div>
  }

})

module.exports=NewSelection;