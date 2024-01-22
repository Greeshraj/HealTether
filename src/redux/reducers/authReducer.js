const initialState = {
    clientId: null,
    clientLogoUrl: null,
    email: null,
    username: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  