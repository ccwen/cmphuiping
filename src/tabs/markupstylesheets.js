var defaultStyleSheet= {
	"test":{borderBottom:"blue 5px double"}
	,"test2":{color:"red"}
}

var styleSheets={"default":defaultStyleSheet}

var markupStyleSheets=function(name) {
	return styleSheets[name||"default"]||{};
}
module.exports=markupStyleSheets;