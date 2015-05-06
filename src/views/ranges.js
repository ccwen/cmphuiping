var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var Ranges=React.createClass({
  mixins: [PureRenderMixin]
  ,propTypes:{
    ranges:React.PropTypes.array.isRequired
  }
  ,renderRanges:function(sels) {
    var out=[];
    for (var i=0;i<sels.length;i++) {
      var sel=sels[i];
      if (!sel[1]) continue;
      var text=sel[2];
      if (text.length>5) text=text.substr(0,5)+"…";
      out.push(<span key={i}>[{sel[0]},{sel[1]},{text}]</span> );
    }
    return out;
  }
  ,render:function() {
    var sels=this.renderRanges(this.props.ranges);
    if (!sels.length) return null;
    return (
      <div>
        <span>{this.props.dbid}:{this.props.segid}</span>
        {sels}
      </div>
    );
  }
});

module.exports=Ranges;