import vagasActionTypes from "./action-types";

const initiaState = {
  vagasList: [],  
  vagasUpdated: [],
};

const vagasReducer = (state = initiaState, action: any) => {
  switch (action.type) {
    case vagasActionTypes.GETVAGAS:
      return { ...state, vagasList: action.payload };

    case vagasActionTypes.UPDATEVAGAS:
      return { ...state, vagasUpdated: action.payload };

    default:
      return state;
  }
};

export default vagasReducer;