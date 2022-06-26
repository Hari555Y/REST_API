const express = require('express');
const joi = require('joi');     

// imported both the libraries
const app = express();    // creating express application on app 
app.use(express.json());  // usong the json file

// now here we will be defining the object to send to the server

const name_ages = [
    {name : 'hari' , age : 21 },
    {name : 'ayush' , age  : 23},
    {name : 'yashu' , age : 22},
    {name : 'random' , age : 19}
]

// implementing the hhtp methods now here
app.get('/' ,  (req, res) =>{
    res.send("welcome to the hari's rest api");

});

app.get('/name_ages' ,  (req, res) =>{
    res.send(name_ages);

});

app.get('/name_ages/:age' ,  (req, res) =>{
    const part_name = name_ages.find(cu => cu.age === parseInt(req.params.age));
    if (!part_name){
        res.status(404).send('oops no one with this age');
        return;
    }
    else {res.send(part_name)};

});

app.post('/name_ages' ,  (req, res) =>{
    const schema = joi.object({
        name:joi.string().min(3).required(),
        age : joi.number().greater(18).required()
    });
    const {error} = schema.validate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;    
    }
    const new_one ={
        name : req.body.name,
        age : req.body.age
    }
    name_ages.push(new_one);
    res.send(new_one);

});

app.put('/name_ages/:age' ,  (req, res) =>{
    const up_name = name_ages.find(c => c.age === parseInt(req.params.age));
    if (!up_name){
        res.status(404).send('oops no one with this age');
        return;
    }
    const schema = joi.object({
        name:joi.string().min(3).required(),
    });
    const {error} = schema.validate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;    
    }
    up_name.name = req.body.name;
    res.send(up_name);

});

app.put('/name_ages/changebyname/:name' ,  (req, res) =>{
    const up_name = name_ages.find(c => c.name === (req.params.name));
    if (!up_name){
        res.status(404).send('oops no one with this name');
        return;
    }
    const schema = joi.object({
        age :joi.number().greater(18).required(),
    });
    const {error} = schema.validate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;    
    }
    up_name.age = req.body.age;
    res.send(up_name);

});















/// here we will be definfing our port variable
const port = process.env.PORT || 5555;
app.listen (port, ()=> console.log('listening on port 5555'));