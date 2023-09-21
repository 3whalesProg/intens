import "./UserProfile.css"
import Header from "./Header"
const UserProfile = () =>
{ 
  return (
    <>
    <div className="UserProfile__wrapper">
      <div className="UserProfile__personal">
        <div className="UserProfile__content">
            <Header />
        </div>
      </div>
    </div>
    
    </>
  );
}


export {UserProfile}
