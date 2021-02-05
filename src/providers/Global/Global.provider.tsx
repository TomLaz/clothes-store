import React, { createContext, useState, useEffect } from 'react';
import { MenuItems, Product, Category, SubCategory, Favourite, TempCategory } from './Global.model';
import { auth } from '../../firebase/firebase';
import useFirestore from '../../firebase/useFirestore';

export interface GlobalProviderData {
    menuItems: MenuItems[];
    currentUser: any;
    clientes: any;
    products: Product[];
    categories: Category[];
    subCategories: SubCategory[];
    tempCategories: TempCategory[];
    favourites: Favourite[];
    loading: boolean;
}

export interface GlobalContextProps {
    data: GlobalProviderData;
    updateMenuItems: Function;
    updateCurrentUser: Function;
    updateClientes: Function;
    updateProducts: Function;
    updateCategories: Function;
    updateSubCategories: Function;
    updateTempCategories: Function;
    updateFavourites: Function;
    updateFavouritesCollection: Function;
    updateLoading: Function;
    signup: Function;
    login: Function;
    logout: Function;
    resetPassword: Function;
    updateEmail: Function;
    updatePassword: Function;
}

export const defaultMenuItems: MenuItems[] = [ {
    url: '',
    title: ''
} ];

export const defaultGlobalProviderData: GlobalProviderData = {
    menuItems: [],
    currentUser: undefined,
    clientes: [],
    products: [],
    categories: [],
    subCategories: [],
    tempCategories: [],
    favourites: [],
    loading: false
};

export const GlobalContext = createContext<GlobalContextProps>({
    data: defaultGlobalProviderData,
    updateMenuItems: Function,
    updateCurrentUser: Function,
    updateClientes: Function,
    updateProducts: Function,
    updateCategories: Function,
    updateSubCategories: Function,
    updateTempCategories: Function,
    updateFavourites: Function,
    updateFavouritesCollection: Function,
    updateLoading: Function,
    signup: Function,
    login: Function,
    logout: Function,
    resetPassword: Function,
    updateEmail: Function,
    updatePassword: Function
});

export const GlobalProvider: React.FC = ({ children }) => {
    const [ providerValue, setProviderValue ] = useState( defaultGlobalProviderData );
    const productsFirestore = useFirestore( 'products' );
    const categories = useFirestore( 'categories' );
    const subCategoriesFirestore = useFirestore( 'subcategories' );
    const favouritesFirestore = useFirestore( 'favourites' );
    const tempCategoriesFirestore = useFirestore( 'tempcategories' );

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

    const updateProducts = ( products: Product[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevState ) => ({
            ...prevState,
            dataLoading: false,
            products
        }) );
    };

    const updateCategories = ( categories: Category[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevState ) => ({
            ...prevState,
            dataLoading: false,
            categories
        }) );
    };

    const updateSubCategories = ( subCategories: SubCategory[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevState ) => ({
            ...prevState,
            dataLoading: false,
            subCategories
        }) );
    };

    const updateTempCategories = ( tempCategories: TempCategory[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevState ) => ({
            ...prevState,
            dataLoading: false,
            tempCategories
        }) );
    };

    const updateFavourites = ( favourites: Favourite[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevState ) => ({
            ...prevState,
            dataLoading: false,
            favourites
        }) );
    };

    const updateFavouritesCollection = ( uid: any, prods: any ): void => {
        favouritesFirestore.updateCollection( uid, prods );
        updateFavourites( favouritesFirestore.docs );
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

    useEffect( (): void => {
        if ( !!productsFirestore.docs.length && providerValue.products.length === 0 ) {
            updateProducts( productsFirestore.docs );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ productsFirestore ] );

    useEffect( (): void => {
        if ( !!categories.docs.length && providerValue.categories.length === 0 ) {
            updateCategories( categories.docs );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ categories ] );

    useEffect( (): void => {
        if ( !!subCategoriesFirestore.docs.length && providerValue.subCategories.length === 0 ) {
            updateSubCategories( subCategoriesFirestore.docs );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ subCategoriesFirestore ] );

    useEffect( (): void => {
        if ( !!tempCategoriesFirestore.docs.length && providerValue.tempCategories.length === 0 ) {
            updateTempCategories( tempCategoriesFirestore.docs );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ tempCategoriesFirestore ] );

    useEffect( (): void => {
        if ( ( !!favouritesFirestore.docs.length && providerValue.favourites.length === 0 ) ||
        ( !!favouritesFirestore.docs.length && providerValue.favourites !== favouritesFirestore.docs ) ) {
            updateFavourites( favouritesFirestore.docs );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ favouritesFirestore ] );

    const providerData = {
        data: providerValue,
        updateMenuItems,
        updateCurrentUser,
        updateClientes,
        updateProducts,
        updateCategories,
        updateSubCategories,
        updateTempCategories,
        updateFavourites,
        updateFavouritesCollection,
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
