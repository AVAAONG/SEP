'use client';
import { ReactNode, createContext, useContext, useEffect, useReducer } from 'react';

interface State {
  data: string;
}

interface Action {
  type: string;
  payload: string;
}

const RegFormContext = createContext<[State, React.Dispatch<Action>] | undefined>(undefined);

export const useRegFormContext = () => {
  return useContext(RegFormContext);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

interface RegFormProviderProps {
  children: ReactNode;
}

export const RegFormProvider = ({ children }: RegFormProviderProps) => {
  //initialize state from localStorage
  const initialState = JSON.parse(localStorage.getItem('regFormState') || '{"data": ""}');
  const [state, dispatch] = useReducer(reducer, initialState);

  //whenever `state` changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem('regFormState', JSON.stringify(state));
  }, [state]);
  return <RegFormContext.Provider value={[state, dispatch]}>{children}</RegFormContext.Provider>;
};
