import { Spin } from "antd";
import React, { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscibe = auth.onAuthStateChanged((user) => {
      console.log("user:", user);
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        navigate("/");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        navigate("/login");
      }
    });

    //Clean function
    return () => {
      unSubscibe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={user}>
      {loading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
