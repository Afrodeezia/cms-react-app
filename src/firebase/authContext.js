import React, { createContext,
                useContext,
                useEffect,
                useState} from "react";

import { createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged} from "firebase/auth";
          
import { auth } from "./firebase";

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({})
  const [timeActive, setTimeActive] = useState(false)

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword
          (auth, email, password)
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword
          (auth, email, password)
  };

  const logout = () => {
    return signOut(auth)
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      (currentUser) => {
        console.log(user)
        setUser(currentUser)
      })
        return () => {
          unsubscribe();
        }
  }, [])

  return (
    <UserContext.Provider 
          value={{createUser, 
                  user, 
                  logout, 
                  signIn,
                  timeActive, 
                  setTimeActive}}>
          {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(UserContext)
}