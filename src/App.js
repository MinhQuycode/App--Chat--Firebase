import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";

function App() {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </>
  );
}

export default App;
