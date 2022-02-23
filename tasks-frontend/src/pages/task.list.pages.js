import { useEffect, useState } from 'react'
import Task from '../components/task.components'
import { changeTaskStatus, getTasks } from '../services/task.service'
import {Link,useNavigate} from 'react-router-dom'
export default function TaskList(props)
{
    const [tasksOpen,setTasksOpen]=useState([])
    const [tasksInProgress,setTasksInProgress]=useState([])
    const [tasksDone,setTasksDone]=useState([])
    const nav=useNavigate()
    
    useEffect(()=>{
        reloadtask()
    },[])

    const reloadtask=()=>{        
        loadTasks('OPEN',setTasksOpen)
        loadTasks('IN_PROGRESS',setTasksInProgress)
        loadTasks('CLOSED',setTasksDone)
    }

    const loadTasks=async (status,func)=>{
        const result=await getTasks(status)
        if(result)
        {
            func(result)
        }
    }

    const changeStatus=async (id,status)=>
    {
        const result=await changeTaskStatus(id,status)
        if(result){
            reloadtask()
        }
    }

    const logout=()=>{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        nav('/signin')
    }
    
    return (
        <div>
            <button style={{float:'right'}} className="btn btn-warning" onClick={logout}>Logout</button>
            <h1 className="header">List Of Tasks</h1>
            <Link to="/task-create">Add Task</Link>
            <div className="row">
                <div className="col">
                    <h2 className="header">Open</h2>
                    <div>
                        {tasksOpen.length>0 && tasksOpen.map(task=>{
                            const{id,status,title,description}=task
                            return <Task 
                                        key={id} 
                                        id={id} 
                                        status={status} 
                                        title={title} 
                                        description={description} 
                                        changeStatus={changeStatus}
                                    />
                        })}
                        {tasksOpen.length===0 && <div>No Currently Open Tasks</div>}
                    </div>
                </div>
                <div className="col">
                    <h2 className="header">In Progress</h2>
                    <div>
                        {tasksInProgress.length>0 && tasksInProgress.map(task=>{
                            const{id,status,title,description}=task
                            return <Task 
                                        key={id} 
                                        id={id} 
                                        status={status} 
                                        title={title} 
                                        description={description} 
                                        changeStatus={changeStatus}
                                    />
                        })}
                        {tasksInProgress.length===0 && <div>No Currently In Progress Tasks</div>}
                    </div>
                </div>
                <div className="col">
                    <h2 className="header">Done</h2>
                    <div>
                        {tasksDone.length>0 && tasksDone.map(task=>{
                            const{id,status,title,description}=task
                            return <Task 
                                        key={id} 
                                        id={id} 
                                        status={status} 
                                        title={title} 
                                        description={description} 
                                        changeStatus={changeStatus}
                                    />
                        })}
                        {tasksDone.length===0 && <div>No Currently All Done Tasks</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}