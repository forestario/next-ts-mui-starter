import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import camelcaseKeys from 'camelcase-keys';
import axios from '@/utils/axios';
import { AxiosResponse } from 'axios';
import localStorageAvailable from '@/utils/localStorage';
//
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';
import { IUser } from '@/types/user';

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        /**
         * Todo: Should be active after demo
         * const { data }: AxiosResponse = await axios.get('/api/account/me');
         * const user = camelcaseKeys(data, { deep: true });
         * */

        /**
         * Todo: Should be removed after demo
         * */
        const user: IUser = {
          id: 1,
          email: 'admin@test.com',
          name: 'admin',
          lastLogin: '',
          dateJoined: '2023-11-08T07:41:44.068360+08:00',
          isAdmin: true,
          isStaff: true,
          isActive: true,
          isSuperuser: false,
        };

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const response = await axios.post('/api/account/login', {
      email,
      password,
    });
    const { access } = response.data;

    setSession(access);

    const { data }: AxiosResponse = await axios.get('/api/account/me');
    const user = camelcaseKeys(data, { deep: true });

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  /**
   * Demo Login
   * Todo: Should be removed after demo
   * */
  const demoLogin = useCallback(async (email: string, password: string) => {
    const access =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxMDI3MTc2LCJpYXQiOjE3MDA5NDA3NzYsImp0aSI6ImViZDVkYjkxM2Y1ODQ3MjFiZjU1YmM2YTQ0OGVjZjRiIiwidXNlcl9pZCI6MX0.U-We8W59imDrcOe1627MUktlcqW7LyILH1ebzcokV3A';

    setSession(access);

    const user: IUser = {
      id: 1,
      email: 'admin@test.com',
      name: 'admin',
      lastLogin: '',
      dateJoined: '2023-11-08T07:41:44.068360+08:00',
      isAdmin: true,
      isStaff: true,
      isActive: true,
      isSuperuser: false,
    };

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      demoLogin,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout],
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
