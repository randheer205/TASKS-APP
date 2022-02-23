import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { signup } from '../services/user.service'

export default function Signup(props)
{
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')

    const nav=useNavigate()

    async function onSignup()
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
            alert("Signing Up...")
            const result=await signup(username,password)
            if(result)
            {
                nav('/signin')
            }
        }
    }
    return (
        <div>
            <h1 className="header">Sign Up</h1>
            <div className="form">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Username</label>
                    <input onChange={
                        (e)=>{
                            setUsername(e.target.value)
                        }
                    } type="text" className="form-control"/>
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Password</label>
                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    } type="password" className="form-control"/>
                </div>

                <div className="mb-3">
                    <div><Link to="/signup">Sign In Here</Link></div>
                    <button className="btn btn-success" onClick={onSignup}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}