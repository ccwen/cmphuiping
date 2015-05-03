var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var NewSelection=React.createClass({
  mixins: [PureRenderMixin]
  ,getInitialState: function () {
    return {};
  }
  ,propTypes:{
    selections:React.PropTypes.object.isRequired
  }
  ,hasSelection:function() {
    var sels=this.props.selections;
    for (var i in sels) {
      if (sels[i][0][1]) return true;
    }
    return false;
  }
  ,render:function(){
    var cancreate=this.hasSelection();

    return <div>
        <select>
          <option key={1}>1</option>
          <option key={2}>2</option>
        </select>
        <button disabled={!cancreate}><i className="fa fa-link"/></button>
      </div>
  }

})

module.exports=NewSelection;