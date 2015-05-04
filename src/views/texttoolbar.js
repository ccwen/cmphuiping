var React=require("react/addons");
var PureRenderMixin=React.addons.PureRenderMixin;

var TextToolbar=React.createClass({
	mixins:[PureRenderMixin]
	,propTypes:{
		action:React.PropTypes.func.isRequired
	}
	,prevSeg:function() {
		this.props.action("prev");
	}
	,nextSeg:function() {
		this.props.action("next");
	}
	,cloneTabInNewPanel:function() {
		this.props.action("clone");	
	}
	,fontresize:function() {
		this.props.action("fontresize");
	}
	,toggleEdit:function() {
		this.props.action("toggleedit");
	}	
	,resize:function() {
		this.props.action("resize");
	}
	,render:function(){
		var btnstyle={marginLeft:"auto"};
		if (this.props.editing) btnstyle={marginLeft:"auto",backgroundColor:"lightgreen",
			borderRadius:"25%",border:"1px solid lightgreen",outline:"none"};
		return (
     	<div style={{display:"flex"}}>
          <button onClick={this.prevSeg}><i className="fa fa-chevron-left"/></button>
          <button title="Open tab in new Panel" onClick={this.cloneTabInNewPanel}><i className="fa fa-files-o"></i></button>          
          <button title="resize" onClick={this.resize}><i className="fa fa-arrows-h"></i></button>
          <button title="change font size" onClick={this.fontresize}><i className="fa fa-font"></i></button>

          <button onClick={this.nextSeg}><i className="fa fa-chevron-right"/></button>
          <button style={btnstyle} onClick={this.toggleEdit}><i className="fa fa-pencil"/></button>
          </div>	
         );
	}   
});

module.exports=TextToolbar;
