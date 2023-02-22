import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

export const loadUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("https://api.github.com/search/users", {
        params: {
          q: "type:user",
        },
      });
      dispatch(getUsers(response?.data?.items));
    } catch (error) {
      console.log(error);
    }
  };
};
