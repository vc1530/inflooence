import './UserCard.css' 
import {flag} from 'country-emoji' 

const UserCard = (props) => { 

    //const {flag, code, name, countries} = require('country-emoji');

    return ( 
        <div className="UserCard"> 
            <div className="rank"> 
                {props.rank} 
            </div>
            <div className="username">
                {props.username} 
            </div>
            <div className="country"> 
                {flag(props.country === "U.S.A" ? "USA" : props.country)}
            </div>
            <div className="followers">  
                {props.followers} 
            </div>
            <div className="views">  
                {props.views} 
            </div>
            <div className="likes">  
                {props.likes} 
            </div>
        </div>
    )
}

export default UserCard