export const userReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, users: action.payload };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };