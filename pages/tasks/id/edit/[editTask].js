import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { updateTask, viewTask } from '../../../../petitions/userPeople';
import style from "../../../../styles/editTask.module.css"


function TaskEdit() {
   const router = useRouter();
   const id = router.query.editTask;

   const [viewTasks, setViewTasks] = useState([])
  

   const getPeople = async (id) => {
      const dataTasks = await viewTask(id)
      setViewTasks(dataTasks)      
    }

    useEffect(() => {
      const getData = async () => {
        await getPeople(id);
      }
       if (id) getData()
    }, [id])

    const handleSubmit = (e) => {
      e.preventDefault();
      let date = new Date();
      if( viewTasks.endDate > date){
         setViewTasks({
            ...viewTasks,
         completed: 'true' })
      }
      updateTask(viewTasks.id, viewTasks)
      router.push(`/profile/id/${viewTasks.personId}`)
   }

   const handleChenge = (e) => {
      setViewTasks({
         ...viewTasks,
         [e.target.name]: e.target.value
      });
      return viewTasks
   };

    return (
       <div className={style.containertask}>
         <h5 className={style.h5}>Edit task</h5>
         <form className={style.form}
            onSubmit={handleSubmit}
         >
            <div className={style.formGroup}>
            <label htmlFor="Title" className={style.label}>Title:</label>
            <input className={style.input}
               type="texto"
               name="title"
               placeholder="type a title"
               defaultValue={viewTasks.title}
               onChange={handleChenge}
               required
            />
            </div>
            <div className={style.formGroup}>
            <label htmlFor="description" className={style.label}>Description: </label>
            <input className={style.input}
               type="texto"
               name="description"
               placeholder="type a description"
               defaultValue={viewTasks.description}
               onChange={handleChenge}
               required
            />
            </div>
            <div className={style.formGroup}>
            <label htmlFor="startDate" className={style.label}>Start Date:</label>
            <input className={style.input}
               type="date"
               name="startDate"
               defaultValue={viewTasks.startDate}
               onChange={handleChenge}
               required
            />
            </div>
            <div className={style.formGroup}>
            <label htmlFor="endDate" className={style.label}>End Date:</label>
            <input className={style.input}
               type="date"
               name="endDate"
               defaultValue={viewTasks.endDate}
               onChange={handleChenge}
            />
            </div>
            <div className={style.formGroup}>
            <label htmlFor="completed" className={style.label}>State:</label>
               <select htmlFor="completed" className={style.input}
                  name="completed"
                  placeholder="Select a state"
                  onChange={handleChenge}
                  required
                  defaultValue={setViewTasks.completed}
                  >
                  <option value="">Select state</option>
                  <option value="true">Completed</option>
                  <option value="false">Incompleted</option>
               </select>
            </div>
           
            <div className={style.btns}>
               <button type="submit" className={style.button}>Update</button>
               <Link href={`/profile/id/${viewTasks.personId}`}><button type="button" className={style.button}>Cancel</button></Link>
            </div>
         </form>

      </div>
    )
  }
  
  export default TaskEdit