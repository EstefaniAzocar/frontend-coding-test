
import Link from "next/link";
import style from "./itemUser.module.css";

function ItemUser(props) {

    return (
        <>
        <Link href={`/profile/id/${props.id}`}>
            <div className={style.itemPeople}>
                <img src={props.picture} alt={props.fullName} className={style.image} />
                <p className={style.name}>{props.fullName}</p>
                <p className={style.age}>{props.age}</p>
                <p className={style.occupation}>{props.occupation}</p>
            </div>
        </Link>
        </>
    )
  }
  
  export {ItemUser}