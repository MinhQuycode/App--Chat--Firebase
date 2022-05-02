import React, {
  Children,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import useFileStore from "../hooks/useFileStore";
import { AuthContext } from "./AuthProvider";
export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { uid } = useContext(AuthContext);
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isinviteVisible, setIsInviteVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  //  Ngăn chặn việc render lại khi uid không thay đổi
  const roomsConditions = useMemo(() => {
    return {
      fielName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFileStore("rooms", roomsConditions);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersConditions = useMemo(() => {
    return {
      fielName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFileStore("users", usersConditions);

  return (
    <AppContext.Provider
      value={{
        members,
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        isinviteVisible,
        setIsInviteVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
