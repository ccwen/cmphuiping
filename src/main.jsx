var React=require("react");
var kse=require("ksana-search");
var SystemPanel=require("./containers/systempanel");

var maincomponent = React.createClass({
  render: function() {
    return <div style={{width:"100%",height:"100%",background:"gray"}}>
      <SystemPanel/>
    </div>;
  }
});
module.exports=maincomponent;