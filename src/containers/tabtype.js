
var tabtypes={
	"pnode":require("./pnodetab"),
	"kepan":require("./toctab"),
	"text":require("./texttab")
}
var componentbyType=function(type) {
	var component=tabtypes[type];
	if (!component) return tabtypes.text;
	return component;
}

module.exports={componentbyType:componentbyType};
