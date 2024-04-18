'use client';
import { Gender } from '@prisma/client';
import { ReactNode, createContext, useContext, useEffect, useReducer } from 'react';

interface State {
  photo: string;
  first_names: string;
  last_names: string;
  dni: number;
  gender: Gender;
  birthdate: string;
  state: string
  address: string
}

interface Action {
  type: string;
  payload: State;
}

const RegFormContext = createContext<[State, React.Dispatch<Action>] | undefined>(undefined);

export const useRegFormContext = () => {
  return useContext(RegFormContext);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PHOTO':
      return { ...state, photo: action.payload.photo };
    case 'SET_PERSONAL_INFORMATION':
      return { ...state, ...action.payload };
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
