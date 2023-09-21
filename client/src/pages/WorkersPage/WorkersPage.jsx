import "./WorkersPage.css"
import { getUsers} from "../../http/UsetApi"
import { useEffect, useState } from "react"
import { useSearchParams} from "react-router-dom"
import WorkersList from "./WorkersList"
import WorkersCheckbox from "./WorkersCheckbox"

const Workers = () =>{
    const [userList, setUserList] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const role = searchParams.get('role') || ""
    const GetUsers = async () => {
        try{
            await getUsers(role)
            .then(response => 
                {   console.log(response)
                    setUserList(response['data']['workersInfo'])
                })
        }
        catch(e){
            console.log(e)
        }
        }
        useEffect(() => {
            GetUsers(role)
        },[searchParams])
    return(
        <>
        <div className="Workers__wrapper">
            <div className="Workers__main">
                <WorkersList userList= {userList} />
            </div>
            <WorkersCheckbox />
        </div>
        </>
    )
}
export {Workers}