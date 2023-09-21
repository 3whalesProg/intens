import { useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Context } from "../../index"
import { useContext, useState, useEffect } from "react"
import { getProfile} from "../../http/UsetApi"

const Header = observer(() => {
    const params = useParams()
    const {user} = useContext(Context)
    const [profile, setProfile] = useState([])
    const IsMyPage = params.id == user.UserId
    const GetProfile = async () => {
      try{
          await getProfile(params.id)
          .then(response => 
              {   console.log(response)
                  setProfile(response['data']['userInfo'])
              })
      }
      catch(e){
          console.log(e)
      }
    }
    useEffect(() => {
      GetProfile(params.id)
    },[params.id])
    return(
        <>
        <div className="UserProfile__form">
              <div className="UserProfile__Header_backgroundPhoto">
                {/* <button className="UserProfile__Header_settings" onClick={(event) => {openModal(event)}}></button> */}
              </div>
              <div className="UserProfile__Header_info">
                    <div src="" className="UserProfile__Header_ava"/>
                    <div className="UserProfile__Header_about">
                        <div className="UserProfile__Header_mainInfo">
                            <div className="UserProfile__Header_username">{profile['firstName'] + ' ' + profile['secondName']}</div>
                            <div className="UserProfile__Header_role">{profile['role']}</div>
                        </div>
                        <div className="UserProfile__Header_contact">
                            <div className="UserProfile__Header_phone">Телефон: {profile['phone']}</div>
                            <div className="UserProfile__Header_email">Почта: {profile['email']}</div>
                            {IsMyPage ? <></>: <><div className="UserProfile__Header_toChat smallbutton">Написать</div> </>}
                        </div>
                    </div>
              </div>
        </div>
        {/* <UserModal active={modalActive} setActive={setModalActive}></UserModal> */}
        </>
    )
})

export default Header