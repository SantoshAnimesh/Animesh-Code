import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchUsersStart } from "./stores/userSlice";

function Display() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state?.users?.data);
  console.log(usersData);

  useEffect(() => {
    dispatch(fetchUsersStart());
  }, []);
  return (
    <div>
      <h1>Hello Welcome</h1>
    </div>
  );
}

export default Display;
