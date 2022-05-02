import React from "react";
import { Row, Col, Button, Typography } from "antd";
import firebase, { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { addDocument, generateKeywords } from "../../firebase/service";

//Style materia ui
const { Title } = Typography;
//Firebase
const fbProvider = new firebase.auth.FacebookAuthProvider();
const Login = () => {
  const handleFBLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keyWords: generateKeywords(user.displayName),
      });
    }
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }}>Fun Chat</Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Login with Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFBLogin}>
            Login with Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
