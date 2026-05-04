
import React,{createContext , useContext , useMemo, useReducer} from "react";
import { initialState, reducer} from "./reducer.js";

const StateContext = createContext(null);
const DispatchContext = createContext(null);


export const StoreProvider = ({children})=> {
  const [state,dispatch] = useReducer(reducer,initialState);

  const memoState = useMemo(() => state,[state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={memoState}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}


export const useStoreState = ()=>{
  const ctx = useContext(StateContext);
  if(!ctx) throw new Error("useStore must be use inside storeProvider");
  return ctx;
}

export const useStoreDispatch = () => {
  const ctx = useContext(DispatchContext);
  if(!ctx) throw new Error("use store must be use inside storeProvider");
  return ctx;
}
