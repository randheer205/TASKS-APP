import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { signin } from '../services/user.service'
export default function Signin(props)
{

    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')

    const nav=useNavigate()

    async function onSignin()
    {
        if(username.length<=6)
        {
            alert("INVALID EMAIL")
        }
        else if(password.length<=6)
        {
            alert("INVALID PASSWORD")
        }
        else
        {
            //alert("Signing In...")
            const result=await signin(username,password)
            if(result)
            {
                //alert("Success")
                const token = result
                //console.log(result)
                sessionStorage['token']=token
                sessionStorage['username']=username
                nav('/task-list')
            }
            else
            {
                console.log(result)
                alert("Invalid username Or password")
            }
        }
    }

    return (
        <div>
            <h1 className="header">Sign In</h1>
            <div className="form">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Username</label>
                    <input onChange={
                        (e)=>{
                            setUsername(e.target.value)
                        } }type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Password</label>
                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        } }type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>

                <div className="mb-3">
                    <div><Link to="/signup">Create Account Here</Link></div>
                    <button className="btn btn-success" onClick={onSignin}>Sign In</button>
                </div>
            </div>
        </div>
    )
}