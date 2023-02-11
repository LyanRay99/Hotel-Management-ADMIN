import { createStore } from "redux";
import userData from "./Data/list_users.json";
import roomData from "./Data/list_room.json";

const initialState = {
  sidebarShow: false,
  user: userData,
  room: roomData,
  objUser: {
    id: "",
    fullName: "",
    date: "",
    sex: "",
    avatar: "URL",
    identityCard: "",
    nationality: "",
    phone: "",
    email: "",
    address: "",
    dateCreated: "",
    dateUpdated: "",
    actived: true,
    userName: "",
    password: "",
    role: "",
    branch: "",
  },
};

const changeState = (state = initialState, { type, payload, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };

    //* Completed: Get info to add user
    case "getInfo":
      if (payload.name === "fullName") {
        state.objUser.fullName = payload.value;
      } else if (payload.name === "birth") {
        state.objUser.date = payload.value;
      } else if (payload.name === "sex") {
        state.objUser.sex = payload.value;
      } else if (payload.name === "identityCard") {
        state.objUser.identityCard = payload.value;
      } else if (payload.name === "nationality") {
        state.objUser.nationality = payload.value;
      } else if (payload.name === "email") {
        state.objUser.email = payload.value;
      } else if (payload.name === "address") {
        state.objUser.address = payload.value;
      } else if (payload.name === "role") {
        state.objUser.role = payload.value;
      } else if (payload.name === "branch") {
        state.objUser.branch = payload.value;
      } else if (payload.name === "userName") {
        state.objUser.userName = payload.value;
      } else if (payload.name === "password") {
        state.objUser.password = payload.value;
      }
      return state;

    //* Completed: Add User
    case "addUser":
      //* TODO: check
      //* TODO: Push User data
      state.objUser.id = state.user.length + 1;
      state.user.push(state.objUser);

      //* Reset
      state.objUser = {
        id: "",
        fullName: "",
        date: "",
        sex: "",
        avatar: "URL",
        identityCard: "",
        nationality: "",
        phone: "",
        email: "",
        address: "",
        dateCreated: "",
        dateUpdated: "",
        actived: true,
        userName: "",
        password: "",
        role: "",
        branch: "",
      };
      return state;

    // //* Delete
    case "deleteUser":
      // state.user = state.user.filter((User, index) => {
      //   // console.log(index)
      //   return index !== payload
      // })
      state.user.splice(payload, 1);
      // state.user = deleteUser
      // console.log(deleteUser)
      console.log(state.user);
      return state;

    default:
      // console.log('default')
      return state;
  }
};

const store = createStore(changeState);
export default store;
