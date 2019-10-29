import { REFRESH_AIRCRAFT_INFORMATION } from "../actions/actionTypes";

const initialState = {
  items: []
};

export const behaviorReducer = function(state = initialState, action) {
  switch (action.type) {
    case REFRESH_AIRCRAFT_INFORMATION:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};
