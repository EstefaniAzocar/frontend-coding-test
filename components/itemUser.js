
import style from "./itemUser.module.css";

function ItemUser(props) {
    const peopleView = async()=>{
       //redirigir a otra pagina
    }
    return (
        <div className={style.itemPeople} onClick={peopleView}>
            <img src={props.picture} alt={props.fullName} className={style.image} />
            <p className={style.name}>{props.fullName}</p>
            <p className={style.age}>{props.age}</p>
            <p className={style.occupation}>{props.occupation}</p>
        </div>
    )
  }
  
  export {ItemUser}