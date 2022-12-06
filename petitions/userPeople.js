const url = process.env.next_API_URL || 'http://localhost:3001/'

const peopleList = async ()=> {
   const result = await fetch('http://localhost:3001/people')
   const data = await result.json()

   return data
}

export {peopleList}