

exports.onHello=function(req,resp){
    var msg="Hello How R u fyn..???";
    resp.send(msg);
}
exports.onDoSomething=function(req,resp){
    var data={Name:'Bhanu Chandar',City:'Hyderabad'};
    resp.send(data);
    resp.end();

}