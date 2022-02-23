const Task=(props)=>{
    const{id,title,description,status,changeStatus}=props

    const getbuttontitle=()=>{
        if(status==='OPEN')
        {
            return 'IN PROGRESS'
        }else if(status==='IN_PROGRESS')
        {
            return 'Done'
        }
    }
    const onbuttonclick=()=>{
        if(status==='OPEN')
        {
            changeStatus(id,'IN_PROGRESS')
        }else if(status==='IN_PROGRESS')
        {
            changeStatus(id,'CLOSED')
        }
    }

    return <div className="card" style={{width:'25rem',display:'inline-block',margin:'10px',height:'150px'}}>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            { status !=='CLOSED' &&
            <button onClick={onbuttonclick} className="btn btn-success">{getbuttontitle()}</button>}
        </div>
        </div>
}
export default Task