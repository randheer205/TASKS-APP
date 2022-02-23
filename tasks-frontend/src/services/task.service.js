import axios from "axios"
import {settings} from "../config"

export const getTasks=async (status='')=>
{
    const url=settings.server+`/task?status=${status}`
    const token=sessionStorage['token']
    let result
    try
    {
        result=await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        })
        result=result.data
    }
    catch(ex)
    {
        result=ex
    }
    return result
}

export const createTasks=async (title,description)=>
{
    const url=settings.server+`/task`
    const token=sessionStorage['token']
    let result
    //console.log(title,description)
    try
    {
        result=await axios.post(url,
            {title,description},
            {headers:{
                Authorization:`Bearer ${token}`,
            },
        })
        result=result.data
        //console.log(result)
    }
    catch(ex)
    {
        result=ex
    }
    return result
}

export const changeTaskStatus=async (id,status)=>
{
    const url=settings.server+`/task/${id}/${status}`
    const token=sessionStorage['token']
    let result
    try
    {
        //console.log("THIS ONE INSIDE changetaskstatus status:"+status+" id:"+id)
        result=await axios.patch(url,{},
            {headers:{
                Authorization:`Bearer ${token}`,
            },
        })
        result=result.data
        //console.log(result)
    }
    catch(ex)
    {
        result=ex
        console.log(result)
    }
    return result
}