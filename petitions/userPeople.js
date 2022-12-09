const url = process.env.next_API_URL || 'http://localhost:3001/'

const peopleList = async ()=> {
   const result = await fetch('http://localhost:3001/people')
   const data = await result.json()

   return data
}

const getPeopleId = async(id)=> {
   const result = await fetch(`http://localhost:3001/people/${id}`)
   const data = await result.json()
   return data
}

const taskList = async (id)=> {
   const result = await fetch(`http://localhost:3001/tasks?personId=${id}`)
   const data = await result.json()
   
   return data
}
const updateProfile = async (id, newProfile)=>{
   
   const response = await fetch(`http://localhost:3001/people/${id}`, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(newProfile)
   });
   (console.log({response}));
}

const viewTask = async (id)=> {
   const result = await fetch(`http://localhost:3001/tasks/${id}`)
   const data = await result.json()
   
   return data
}

const updateTask = async (id, newTask)=>{
   console.log('llego', id, newTask);
   const response = await fetch(`http://localhost:3001/tasks/${id}`, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(newTask)
   });
   (console.log({response}));
}

export {peopleList,getPeopleId, taskList, updateProfile, viewTask, updateTask}