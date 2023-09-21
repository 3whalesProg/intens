import { useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { useParams } from "react-router-dom"
import './UserModal.css'
import { createAvatar } from '../../../http/UsetApi'


const UserModal = ({active, setActive}) => {
        const params = useParams()
        const [isBut, setIsBut] = useState(false)
        const [avatarPreview, setAvatarPreview] = useState(null);
        const [newAvatar, setNewAvatar] = useState(null);
        var avatar = new FormData()
        avatar.append("id", params.id)
        const onDrop = (acceptedFiles) => {
          const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result)
                avatar.append('img', acceptedFiles[0])}
                console.log(avatar)
                reader.readAsDataURL(acceptedFiles[0]);
        };
        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
        const CreateAvatar = async () => {
            try{
                await createAvatar(avatar)
                console.log('gg')
            }
            catch(e){
                console.log(e)
            }
          }
        const sendAvatar = (e) => {
            e.preventDefault()
            console.log('Почти внутри')
                CreateAvatar(avatar)
                console.log("Внутри")
        }
        useEffect(() => {
            if (isBut){
                console.log('2')
            }
            
        }, [])
    return(
        <>
        <div className= {active ? "userModal active": "userModal"} onClick={() => setActive(false)}>
                <div className="userModal__content" onClick={e => e.stopPropagation()}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? (<p>Перетащите аватар сюда...</p>) : (<p>Перетащите аватар или нажмите для выбора файла.</p>)}
                        {avatarPreview && <img src={avatarPreview} alt="Avatar preview" />}
                        
                    </div>
                    <button onClick={e => sendAvatar(e)}>fdfdfd</button>
                </div>
                
        </div>

        </>
    )
}
export default UserModal