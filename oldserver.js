var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var cors           =         require('cors')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

let knex = require('knex')({
    //client: 'sqlite3',
    // connection: { filename: 'storage.sqlite' },
    // useNullAsDefault:true
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'express_contact'
      },
      pool: { min: 0, max: 7 }

  })


app.get('/',function(req,res){
    get_contacts()
    .then(function (records) {
        res.send(records);
    })
});



function get_contacts() {
    return knex('contacts').select('*')
        .then(function (records) {
           return records;
        })
}

function get_contacts_by_id(cid) {
    return knex('contacts').select('*').where('id',cid)
        .then(function (records) {
           return records;
        })
}


app.post('/savecontact',function(req,res){
  const fname=req.body.fname;
  const lname=req.body.lname;
  const email=req.body.email;
  const num=req.body.num;
  


knex("contacts").insert([
    { firstname: fname, lastname: lname ,email: email, number: num  }
  
  ]).then(() => console.log("Inserted"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
             
    });

  res.end("yes");



});



app.get('/getcontact_byid',function(req,res){
    const cid=req.query.cid;
   
    get_contacts_by_id(cid)
    .then(function (records) {
        res.send(records);
    })
});



app.put('/editcontact',function(req,res,next){
   
    console.log(req.body.cid);
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const num=req.body.num;
    const id=req.body.cid;
  
  knex("contacts").where('id',id).update(
      { firstname: fname, lastname: lname ,email: email, number: num }
    
    ).then(() => console.log("Updated"))
      .catch((err) => { console.log(err); throw err })
      .finally(() => {
          knex.destroy();
          
      });
  
  
    res.end("yes");




});
    



  app.delete('/deletecontact',function(req,res){
   
    console.log(req.body.cid);
 
    const id=req.body.cid;
  
  knex("contacts").where('id',id).delete().then(() => console.log("Deleted"))
      .catch((err) => { console.log(err); throw err })
      .finally(() => {
          knex.destroy();
      });
  
  
    res.end("yes");


   
  });


app.listen(3000,function(){
  console.log("Started on PORT 3000");
})