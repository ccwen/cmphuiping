var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var TextFooter=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		action:React.PropTypes.func.isRequired
	}
	,render:function(){
	   	if (this.props.editing) {
     	 return ( <div style={{display:"flex"}}>
        	<button style={{marginLeft:"auto"}} >apply Changes</button>
        	</div>);
   		 } else {
      		return <button>dictionary</button>
   		 }	
	}
});

module.exports=TextFooter;
