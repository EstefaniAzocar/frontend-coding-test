import React, { useEffect, useState } from "react"
import { ItemUser } from "../components/itemUser"
import { peopleList } from "../petitions/userPeople"
import Style from "../styles/index.module.css"



function HomePage() {
  const [viewListPeople, setViewListPeople] = useState([])

  const getListPeople = async () => {
    let data = await peopleList()
    data.sort(function (a, b) { return a.age - b.age })
    setViewListPeople(data.map((people) => {
      return {
        picture: people.picture,
        fullName: people.fullName,
        age: people.age,
        occupation: people.occupation,
        id: people.id
      }
    }))
  }

  useEffect( () =>{
    getListPeople()
   }, [])

  return (
    <>
    <div className={Style.container}>
      <div className={Style.viewListPeople}>
        {viewListPeople.map(data => (<ItemUser key={data.id} fullName={data.fullName} age={data.age} occupation={data.occupation} picture={data.picture} id={data.id} />))}
      </div>
    </div>
    </>
    )
}

export default HomePage