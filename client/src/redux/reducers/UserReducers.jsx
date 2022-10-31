import {
    User_REQUEST,
    User_SUCCESS,
    User_FAIL,
    CLEAR_ERRORS,
    User_Logout,
    User_Change,
    User_DeleteMessages,
    User_Approved,
  

  } from "../constants/userConstants";
  

export const userReducer = (state={User:null}, action) => {
    switch (action.type) {
      case User_REQUEST:
        return {
          loading: true,
          User: null,
        };
      case User_SUCCESS:
        return {
          loading: false,
          User: action.payload,
        };
      case User_Logout:
        return {
          loading: false,
          User: null,
        };
        case User_Change:
        return {
          loading: false,
          User: action.payload,
        };
        case User_DeleteMessages:
        return {
          loading: false,
          User: action.payload,
        };
        case User_Approved:
        return {
          loading: false,
          User: action.payload,
        };

        
        
      case User_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };


 