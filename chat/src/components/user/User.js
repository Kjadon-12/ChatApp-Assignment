import React , {useState} from 'react';
import styles from './User.module.css';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [userName , setUserName] = useState('');
  const [require , setRequire] = useState(false);
  const navigate = useNavigate();
  const startChat = ()=>{
    // console.log(userName)
    if(userName !== ''){
      navigate('/chat' , { state: { userName: userName } })
    }
    else{
       setRequire(true)
    }
    
  }
  return (
    <div>
        <div className={styles.userForm}>
            <input required value={userName} onChange={(event)=>  setUserName(event.target.value)} placeholder='Enter Your Name' className={styles.inputB}></input>
           {require && <p className={styles.userNameReq}>Name is required</p>}
            <button className={styles.btn} onClick={startChat}>Start Chatting</button>
        </div>
    </div>
  )
}

export default User