import React, { useEffect, useState } from "react"
import { ItemUser } from "../components/itemUser"
import { peopleList } from "../petitions/userPeople"
import style from "../styles/index.module.css"
// import Link from "next/link";



function HomePage() {
  const [listPeople, setListPeople] = useState([])
  const [order, setOrder] = useState (false)

  const getListPeople = async () => {
    let data = await peopleList()
    data.sort(function (a, b) { return a.age - b.age })
    setListPeople(data.map((people) => {
      return {
        picture: people.picture,
        fullName: people.fullName,
        age: people.age,
        occupation: people.occupation,
        id: people.id
      }
    }))
  }

  useEffect( () =>{getListPeople()}, [])
  const descChange = () => {
    setOrder(!order)
       setListPeople(listPeople.sort(function (a, b) { return b.age - a.age }))
  }
    
  const ascChange = () =>{
    setOrder(!order)
        setListPeople(listPeople.sort(function (a, b) { return a.age - b.age }))
  }


  return (
    <>
      <div className={style.container}>
        <h1>List Of People</h1>
        <div className={style.order}>
        <p className={style.orderTitle}>Order By Age:</p>
        <div className={style.btn}>
        <button onClick={ascChange} >asc</button>
        <button onClick={descChange}>desc</button>
        </div>
        </div>
        <div className={style.listPeople}>
          {listPeople.map(data => (<ItemUser key={data.id} fullName={data.fullName} age={data.age} occupation={data.occupation} picture={data.picture} id={data.id} />))}
        </div>
      </div>
    </>
    )
}

export default HomePage