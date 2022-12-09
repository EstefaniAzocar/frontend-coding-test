import Link from "next/link";
import { useEffect, useState } from "react";
import style from "./taskList.module.css";

function ItemTask(props) {
    const [dataTask, setDataTask] = useState()
    
    const data = props.data
    console.log(data);

    useEffect(() => {
        setDataTask(props.data.completed)
    }, [props])
   
    const changeState = () => {
        setDataTask(!dataTask)
    }
    return (
        <div className={style.containerCard}>
            <div className={style.description}>
                <p className={style.title}><b>Title:</b> {data.title}</p>
                <p className={style.description}><b>Description:</b> {data.description}</p>
                <p className={style.startDate}><b>Start Date:</b> {data.startDate}</p>
                <p className={style.endDate}><b>End Date:</b> {data.endDate}</p>
                <p className={style.state}><b>State:</b> {dataTask ? 'completed' : 'incompleted'}</p>
            </div>
            <div className={style.btnsTask}>
            <button className={style.btnState} onClick={() => { changeState(dataTask.completed) }}>{dataTask ? 'Mark as not completed' : 'Mark as completed'}</button>
            
            <Link href={`/tasks/id/edit/${data.id}`} >
            <button className={style.btnEdit}>Edit task</button>
            </Link>
          </div>
        </div>
    )
}

export { ItemTask }