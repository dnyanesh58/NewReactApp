const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "welcome@123",
    database: "crud_contact"
})
    
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,resp)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet,(err,result)=>{
        resp.send(result);
    })
});

app.get("/api/get/:id",(req,resp)=>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db where id = ? ";
    db.query(sqlGet,id,(err,result)=>{
        if (err) 
        {
            console.log(err);    
        }
        resp.send(result);
    })
});

app.put("/api/update/:id",(req,resp)=>{
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate,[name,email,contact,id],(err,result)=>{
        if (err) 
        {
            console.log(err);    
        }
        resp.send(result);
    })
});

app.post("/api/post",(req,resp) =>{
    const{name,email,contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)";
    db.query(sqlInsert,[name,email,contact],(err,result) =>{
        if (err) 
        {
            console.log(err);    
        }
    })
});

app.delete("/api/remove/:id",(req,resp) =>{
    const{ id } = req.params;
    const sqlRemove = "DELETE FROM contact_db where id = ?";
    db.query(sqlRemove,id,(err,result) =>{
        if (err) 
        {
            console.log(err);    
        }
    })
});

app.get("/",(req,resp) => {
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('sujit','sujit@gmail.com','5200000000')";
    db.query(sqlInsert,(err,result) =>{
        console.log("error",err);
        console.log("result",result);
        resp.send("hello world");
    })
});
app.listen(4000);
console.log("server running on 4000");