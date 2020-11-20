import React, { createContext, useState, useEffect } from 'react';
import { MenuItems } from './Global.model';
import { auth } from '../../firebase/firebase';

export interface GlobalProviderData {
    menuItems: MenuItems[];
    currentUser: any;
    clientes: any;
    loading: boolean;
}

export interface GlobalContextProps {
    data: GlobalProviderData;
    updateMenuItems: Function;
    updateCurrentUser: Function;
    updateClientes: Function;
    updateLoading: Function;
}

export const defaultMenuItems: MenuItems[] = [ {
    url: '',
    title: ''
} ];

export const defaultGlobalProviderData: GlobalProviderData = {
    menuItems: [],
    currentUser: undefined,
    clientes: [],
    loading: false
};

export const GlobalContext = createContext<GlobalContextProps>({
    data: defaultGlobalProviderData,
    updateMenuItems: Function,
    updateCurrentUser: Function,
    updateClientes: Function,
    updateLoading: Function
});

export const GlobalProvider: React.FC = ({ children }) => {
    const [ providerValue, setProviderValue ] = useState( defaultGlobalProviderData );

    const updateLoading = ( loading: boolean ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, loading };
        });
    };

    const updateMenuItems = ( menuItems: MenuItems[] ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, menuItems };
        });
    };

    const updateCurrentUser = ( currentUser: any ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, currentUser };
        });
    };

    const updateClientes = ( clientes: any ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, clientes };
        });
    };

    const signup = ( email: string, password: string ): Promise<any> => {
        return auth.createUserWithEmailAndPassword( email, password );
    };

    const login = ( email: string, password: string ): Promise<any> => {
        return auth.signInWithEmailAndPassword( email, password );
    };

    const logout = (): Promise<void> => {
        return auth.signOut();
    };

    const resetPassword = ( email: string ): Promise<void> => {
        return auth.sendPasswordResetEmail( email );
    };

    const updateEmail = ( email: string ): Promise<void> => {
        return providerValue.currentUser.updateEmail( email );
    };

    const updatePassword = ( password: string ): void => {
        return providerValue.currentUser.updatePassword( password );
    };

    useEffect( (): any => {
        let unmounted = false;
        auth.onAuthStateChanged( user => {
            if ( !unmounted ) {
                updateCurrentUser( user );
            }
        });

        return (): any => unmounted = true;
    }, [] );

    const providerData = {
        data: providerValue,
        updateMenuItems,
        updateCurrentUser,
        updateClientes,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateLoading
    };

    return (
        <GlobalContext.Provider value={ providerData }>
            { children }
        </GlobalContext.Provider>
    );
};
