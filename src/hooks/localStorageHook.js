import { useState, useEffect } from "react";

const useLocalUser = () => {
  const [na, setNa] = useState(false);
  const [userJson, setUserJson] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === null) {
      setNa(true);
    } else {
      const json_data = JSON.parse(user);
      setUserJson(json_data);
      setNa(false); // Ensure na is false if user is found
    }
  }, []); // Empty dependency array means this runs once on mount

  return { userJson, na };
};

export default useLocalUser;
