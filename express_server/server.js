
/* expressjs light-weight framework to build rest api */ 

const Joi=require('joi'); //for validations In cmd type npm i joi
const express=require('express'); 
const app=express(); //calling the fun
app.use(express.json());
var path=require('path');
var handler=require('./handlers');

//app.use(express.static(path.join(__dirname,'public')));
app.get("/hello",handler.onHello);
app.get("/doSomething",handler.onDoSomething);
//app.get("/",onDefault)
app.get("/arrow",(req,resp)=>{
    resp.send("hello world....");
    resp.end();
});

//end point and route handling function using arrow function
app.get('/college', (req,resp)=>{
    var data={
        "College":"CDAC ACTS",
        "Location":"Pune",
        "Courses":["PGDAC","PGDAI","PGDITIS","PGDESD","PGDBDA"]
    };
    resp.send(data);
   // resp.send(data.Courses);
    resp.end();
} );

//default end point url ie: http://localhost:9090/
app.get('/',(req,res)=>{
    res.send("Hello Welcome to nodejs powerful api and where you can built light-weight api");
});

//all courses
app.get('/courses',(req,res)=>{
    res.send(data.Courses);
});

const details=[
    {id:101,name:'Bhanu Chandar'},
    {id:104,name:'Kiran'},
    {id:111,name:'Laxmikanth'}
];

app.get('/details',(req,res) => {
    res.send(details);
})
app.get('/details/:id',(req,resp)=>{
    const info=details.find(a => a.id === parseInt(req.params.id));
    if(!info) //404 obj not found
    resp.status(404).send('The course with given id is not found');
    resp.send(info);
});

//http post req adding in the details array and making validations via installing JOI
app.post('/details', (req,res) =>{
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send('name length must be at three characters');
        return;
    }
    const info={
        id:details.length+1,
        name:req.body.name
    };
    details.push(info);
    res.send(info);
});

//port environment variable
//port =9090 set port=9090 in cmd this app runs on port 9090
const port=process.env.PORT || 9092;
//const port=process.env.PORT;
var server =app.listen(port, ()=>console.log(`listening on port ${port}`));