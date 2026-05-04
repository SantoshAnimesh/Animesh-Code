export const initialState = {
  name: 'SK',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        name: action?.payload,
      };
    default:
      return state;
  }
};
