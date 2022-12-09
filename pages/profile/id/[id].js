import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import { taskList, getPeopleId } from '../../../petitions/userPeople';
import Link from 'next/link';
import { ItemTask } from '../../../components/taskLis';
import style from "../../../styles/id.module.css";
import Image from 'next/image';
import Script from "next/script"

const Id = () => {
  const [peopleId, setPeopleId] = useState([])
  const [tasksId, setTasksId] = useState([])
  

  const router = useRouter();
  const id = router.query.id;


  const getIdPeople = async (id) => {
    const data = await getPeopleId(id)
    const tasks = await taskList(id)
    setPeopleId(data)
    setTasksId(tasks)
  }

  useEffect(() => {
    const getDataId = async () => {
      await getIdPeople(id);
    }
    if (id) getDataId()
  }, [id])


  return (
    <>
    <Script src="https://kit.fontawesome.com/1b2b17e9e9.js" crossorigin="anonymous"></Script>
      <div className={style.viewPeople}>
      <Link href={"/"} className={style.editProfile}>
        <div className={style.btnHome}>
        <button className="fa-solid fa-house"></button>
        </div>
      </Link>
        <section className={style.container_description}>
            <h1 className={style.title}>Description of the People</h1>
            <div className={style.card}>
              <Image src={peopleId.picture} alt={peopleId.fullName} className={style.image} width="160" height="160" />
              <div className={style.p}>
                <p className={style.fullName}><b>FullName:</b> {peopleId.fullName}</p>
                <p className={style.nickName}><b>Nickname:</b> {peopleId.nickname}</p>
                <p className={style.age}><b>Age:</b> {peopleId.age}</p>
                <p className={style.occupation}><b>Occupation:</b> {peopleId.occupation}</p>
                <p className={style.gender}><b>Gender:</b> {peopleId.gender}</p>
              </div>
                    <Link href={`/profile/id/edit/${peopleId.id}`} className={style.editProfile}>
                <button className={style.editProfile}>Edit Profile</button>
                    </Link>
            </div>

        </section>
        <section className={style.container_tasks}>
            <h1 className={style.title}>Tasks</h1>
            <div className={style.viewtasks}>
                {tasksId.map(data => <ItemTask key={data.id} data ={data}></ItemTask> )}
            </div>
        </section>

      </div>
    </>)
}


export default Id