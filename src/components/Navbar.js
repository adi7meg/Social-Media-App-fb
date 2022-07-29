import { Link } from 'react-router-dom';

import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
  const [results,setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(() =>{
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if(response.success){
        setResults(response.data.users);
      }
    }

    if(searchText.length>2){
      fetchUsers();
    }else{
      setResults([]);
    }

  },[searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img className={styles.fb}
            alt=""
            src="https://cdn-icons.flaticon.com/png/512/2274/premium/2274361.png?token=exp=1659118120~hmac=d9ee6093cc9b784715c3afc66bf766e3"
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img className={styles.searchIcon} 
        src="https://cdn-icons-png.flaticon.com/512/151/151773.png" 
        />
        <input 
        placeholder='Search users'
        value={searchText} 
        onChange={(e)=> setSearchText(e.target.value)} 
       />
       {results.length > 0 && <div className={styles.searchResults}>
        <ul>
          {results.map((user)=> 
          <li className={styles.searchResultsRow} 
          key={`user-${user._id}`}
          >
            <Link to={`/user/${user._id}`}>
              <img 
              src='https://cdn-icons-png.flaticon.com/512/2922/2922506.png' 
              alt='' 
              />
              <span>{user.name}</span>
            </Link>
          </li>)}
        </ul>
        </div>}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
               src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
