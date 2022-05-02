import { Avatar, Button, Typography, notification } from "antd";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";

const UserInfoStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    color: white;
    margin-left: 5px;
  }
`;
const UserInfo = () => {
  const { displayName, email, photoURL, uid } = useContext(AuthContext);

  //Show message
  const openNotificationWithIcon = (type, mes) => {
    notification[type]({
      message: mes,
    });
  };
  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        openNotificationWithIcon("success", "Đăng xuất thành công !");
      })
      .catch((error) => {
        openNotificationWithIcon("error", "Đăng xuất không thành công !");
      });
  };

  return (
    <UserInfoStyle>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button ghost onClick={handleLogout}>
        Log out
      </Button>
    </UserInfoStyle>
  );
};

export default UserInfo;
