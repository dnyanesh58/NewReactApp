import React from 'react'
import { useState,useEffect } from 'react';
import { useHistory,useParams,Link } from 'react-router-dom';
import "./AddEdit.css";
import axios from 'axios';
import { toast } from "react-toastify";


const initialState = {
    name:"",
    email:"",
    contact:"",
};

function AddEdit() {
    var url = "http://localhost:4000";
    const [state,setState] = useState(initialState);

    const {name,email,contact} = state;

    const history = useHistory();

    const {id} = useParams();

    useEffect(() =>{
        axios.get(url + `/api/get/${id}`).then((resp) => setState({...resp.data[0]}))
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !contact) {
            toast.error("All Fields Are Mandatory")
        }
        else 
        {
            if (!id) 
            {
                axios.post(url+"/api/post",{
                    name,
                    email,
                    contact
                }).then(() =>{
                    setState({name: "", email: "", contact: ""})
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added Succefully");
            }
            else{
                axios.put(url+`/api/update/${id}`,{
                    name,
                    email,
                    contact
                }).then(() =>{
                    setState({name: "", email: "", contact: ""})
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Succefully");
            }
            setTimeout(() => history.push("/"),500)
        }
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value}); 
    }
  return (
    <div style={{marginTop:"100px"}}>
        <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"
        }}
        onSubmit={handleSubmit}
        >
            <label htmlFor='name'>Name</label>
            <input 
            type="text"
            id='name'
            name='name'
            placeholder='Your Name ...'
            value={name || ""}
            onChange={handleInput}></input>

            <label htmlFor='email'>Email</label>
            <input 
            type="email"
            id='email'
            name='email'
            placeholder='Your Email ...'
            value={email || ""}
            onChange={handleInput}></input>

            <label htmlFor='contact'>Contact</label>
            <input 
            type="number"
            id='contact'
            name='contact'
            placeholder='Your Contact no ...'
            value={contact || ""}
            onChange={handleInput}></input>

            <input type="submit" value={id ? "Update" : "Save"}></input>
            <Link to="/">
                <input type="button" value="Go Back"></input>
            </Link>
        </form>
    </div>
  )
}

export default AddEdit