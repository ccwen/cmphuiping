var React=require("react");
var TextNavigator=React.createClass({
	propTypes:{
		n:React.PropTypes.string.isRequired
	}
	,render : function() {
		return (<span>
			<button><i className="fa fa-chevron-left"/></button>
			<button><i className="fa fa-chevron-right"/></button>
		</span>
		);
	}
})
module.exports=TextNavigator;