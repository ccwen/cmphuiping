var entrance=[ {
  "path" : "/kepan/dsl_huiping",
  "title" : "李慧萍金剛經講義科判",
  "type" : "kepan"
}, {
  "path" : "/kepan/ds_jwn",
  "title" : "江味農金剛經科判",
  "tocstyle" : "ganzhi",
  "type" : "kepan"
} ]


module.exports={
	"/kepan/ds_jwn":require("./cmphuiping_ds_jwn.json")
	,"/kepan/dsl_huiping":require("./cmphuiping_dsl_huiping.json")
	,"entrance":entrance
	};