import { REFRESH_AIRCRAFT_INFORMATION } from "./actionTypes";
const io = require("socket.io-client"),
  ioClient = io.connect("http://localhost:8000");
export const fetchItems = () => dispatch => {
  ioClient.on("aircraft-imf", posts => {
    dispatch({
      type: REFRESH_AIRCRAFT_INFORMATION,
      payload: posts
    });
  });
};
