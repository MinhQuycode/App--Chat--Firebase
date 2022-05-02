import { FieldBinaryOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFileStore = (colection, condition) => {
  const [documents, setDoccuments] = useState([]);

  useEffect(() => {
    let colectionRef = db.collection(colection).orderBy("createdAt");

    //Condition

    // {
    //     FielName:'abc', giá trị muốn so sánh
    //     operrator:'==' nếu là string, 'in' nếu là Array,
    //     compareValue:'abc' giá trị sẵn có
    // }

    if (colection) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      colectionRef = colectionRef.where(
        condition.fielName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubcribe = colectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDoccuments(documents);
    });

    return () => {
      unsubcribe();
    };
  }, [colection, condition]);
  return documents;
};

export default useFileStore;
