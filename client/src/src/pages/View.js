import React from 'react'
import {useState,useEffect} from 'react';
import { useParams,Link } from "react-router-dom";
import axios from 'axios';
import "./View.css";

function View() {
    const [user,setUser] = useState({});

    var url = "http://localhost:4000";

    const {id} = useParams();

    useEffect(() =>{
        axios.get(url + `/api/get/${id}`).then((resp) => setUser({...resp.data[0]}))
    },[id]);
    
  return (
    <div style={{marginTop: "150px"}}>
        <div className='card'>
            <div className='card-header'>
                <p>User card Details</p>
            </div>
            <div className='container'>
                <strong>ID :</strong>
                <span>{id}</span>
                <br></br>
                <br></br>
                <strong>Name :</strong>
                <span>{user.name}</span>
                <br></br>
                <br></br>
                <strong>Email :</strong>
                <span>{user.email}</span>
                <br></br>
                <br></br>
                <strong>Contact :</strong>
                <span>{user.contact}</span>
                <br></br>
                <br></br>
                <Link to="/">
                    <button className='btn btn-edit'>Go Back</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default View