/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { getPeopleId, updateProfile} from '../../../../petitions/userPeople';
import style from "../../../../styles/editProfile.module.css";


function EditProfile() {
   const router = useRouter();
   const id = router.query.editProfile;

   const [viewPeople, setViewPeople] = useState([])
   const [imgPreview, setImgPreview]= useState(null)

   const getPeople = async (id) => {
      const data = await getPeopleId(id)
      setViewPeople(data)
      setImgPreview(data.picture)
   }

   useEffect(() => {
      const getData = async () => {
         await getPeople(id);
      }
      if (id) getData()
   }, [id])


   const handleSubmit = (e) => {
      e.preventDefault();
      updateProfile(viewPeople.id, viewPeople)
      router.push(`/profile/id/${id}`)
    }


   const handleChenge = (e) => {
      setViewPeople({
         ...viewPeople,
         [e.target.name]: e.target.value
      });
      return viewPeople
   };

   const onChangeImg = async (e, setImgPreview) => {
      const uploadedImg = await e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(uploadedImg)
      fr.onload = () => setImgPreview(fr.result)
      return uploadedImg
   }
   async function uploadImgWeb (img) {

      const form = new FormData();
      form.append('image', img);
      const apiKey = 'f127ee3cf024ade5f59fd80c962e2940'
      const url = `https://api.imgbb.com/1/upload?key=${apiKey}`
      const petition = {
          method: 'POST',
          body: form
      }
      const response = await fetch(url,petition)
      const dataResponse = await response.json()
      return dataResponse.data.url
  }

  const handleImage = async (e) => {
    const urlImgUpload = await onChangeImg(e, setImgPreview)
    const url = await uploadImgWeb(urlImgUpload)
    setViewPeople({
       ...viewPeople,
       picture: url
    })
 }


   return (
      <div  className={style.formContainer}>
         <h1 className={style.h1}>Edit Profile</h1>
         <form className={style.form}
            onSubmit={handleSubmit}
         >
            <div className={style.formGroup}>
            <label htmlFor="fullName" className={style.label}>FullName:</label>
            <input className={style.input}
               type="texto"
               name="fullName"
               placeholder="type a name"
               defaultValue={viewPeople.fullName}
               onChange={handleChenge}
               required
            />
            </div>
            <div className={style.formGroup}>
            <label htmlFor="age" className={style.label}>Age:</label>
            <input className={style.input}
               type="number"
               name="age"
               placeholder="type a age"
               defaultValue={viewPeople.age}
               onChange={handleChenge}
               required
            />
            </div>
            <div className={style.formGroup}>
            <label htmlFor="nickname" className={style.label}>Nickname:</label>
            <input className={style.input}
               type="texto"
               name="nickname"
               placeholder="type a nickname"
               defaultValue={viewPeople.nickname}
               onChange={handleChenge}
               required
            />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="gender" className={style.label}>Gender:</label>
               <select htmlFor="gender" className={style.input}
                  name="gender"
                  placeholder="Select a Gender"
                  onChange={handleChenge}
                  required
                  value={viewPeople.gender}>
                  <option value="Female"> Female</option>
                  <option value="Male">Male</option>
               </select>
            </div>
            <div className={style.formGroup}>
            <label htmlFor="occupation" className={style.label}>Occupation:</label>
            <input className={style.input}
               type="texto"
               name="occupation"
               placeholder="type an occupation"
               defaultValue={viewPeople.occupation}
               onChange={handleChenge}
               required
            />
            </div>
            <div className={style.formGroup}>
                  <label htmlFor="picture" className={style.label}>Picture:</label>
                  <input type="file"
                     name="picture"
                     defaultValue={viewPeople.picture}
                     onChange={handleImage}
                  />
                  <img src={imgPreview} alt="imgPreview" className={style.imagePreview} />
                 
               </div>

            <div className={style.btns}>
               <button type="submit" className={style.button}>Update</button>
               <Link href={`/profile/id/${id}`} ><button type="button" className={style.button}>Cancel</button></Link>
            </div>
         </form>

      </div>
   )
}

export default EditProfile