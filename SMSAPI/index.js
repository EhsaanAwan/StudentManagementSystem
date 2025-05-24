const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(express());
app.use(cors());

app.get('/',async(req,res)=>{
    try{
        res.json({QUERY : "Successfully Connected........!"});
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/teachers',async(req,res)=>{
    try{
        const result = await pool.query('select * from teacher');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/touqeer',async(req,res)=>{
    try{
        const result = await pool.query('select * from course');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/enrolments',async(req,res)=>{
    try{
        const result = await pool.query('select * from enrolment');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/complete',async(req,res)=>{
    try{
        const result = await pool.query('select s.name as Student_Name,t.name as Teacher_Name,c.name as Course from enrolment e inner join student s on e.sid = s.id inner join teacher t on e.tid = t.id inner join course c on e.course_code = c.course_code');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

const Port = process.env.PORT || 6060;
app.listen(Port,()=>{
    console.log(`Successfully Connected on PORT ${Port}`);
});