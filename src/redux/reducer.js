import * as types from "./actionType";

const initialState = {
  users: [],
  loading: true,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    default:
      return state;
  }
};
export default usersReducer;
