import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { createTasks } from '../services/task.service'
export default function TaskCreate(props)
{
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')

    const nav=useNavigate()

    async function onCreateTask()
    {
        if(title.length===0)
        {
            alert("No Title")
        }
        else if(description.length===0)
        {
            alert("No Description")
        }
        else
        {
            //alert("Signing In...")
            const result=await createTasks(title,description)
            if(result)
            {
                //alert("Success")
                /* const token = result
                //console.log(result)
                sessionStorage['token']=token
                sessionStorage['title']=title
                sessionStorage['descrription']=description */
                nav('/task-list')
            }
            else
            {
                console.log(result)
            }
        }
    }

    return (
        <div>
            <h1 className="header">Create Task</h1>
            <div className="form">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Title</label>
                    <textarea onChange={
                        (e)=>{
                            setTitle(e.target.value)
                        } }className="form-control" rows={1}/>
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Description</label>
                    <textarea onChange={
                        (e)=>{
                            setDescription(e.target.value)
                        } } className="form-control" rows={5}/>
                </div>

                <div className="mb-3">
                    <button className="btn btn-success" onClick={onCreateTask}>Save</button>
                    <Link className="btn btn-cancel" to={'/task-list'}>Cancel </Link>
                </div>
            </div>
        </div>
    )
}