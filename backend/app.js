var app = require("express")();

var port = process.env.PORT || 8080;

app.get("/", function(req,res){
  return res.send("HELLO");
});

app.listen(port, function(){
  console.log("server listening on " + port);
});
