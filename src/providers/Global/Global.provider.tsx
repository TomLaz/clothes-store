import React, { createContext, useState, useEffect } from 'react';
import { MenuItems, Product, Category, SubCategory, Favourite, Filter } from './Global.model';
import { auth } from '../../firebase/firebase';
import useFirestore from '../../firebase/useFirestore';
import firebase from 'firebase/app';

export interface GlobalProviderData {
    menuItems: MenuItems[];
    currentUser: any;
    products: Product[];
    categories: Category[];
    subCategories: SubCategory[];
    favourites: Favourite[];
    filters: Filter[];
    filteredOptions: [];
    checkedFilters: any;
    filteredProducts: Product[];
    activeMenu: {[key:string]: boolean};
    loading: boolean;
}

export interface GlobalContextProps {
    data: GlobalProviderData;
    updateMenuItems: Function;
    updateCurrentUser: Function;
    updateProducts: Function;
    updateCategories: Function;
    updateSubCategories: Function;
    updateFavourites: Function;
    updateFavouritesCollection: Function;
    signup: Function;
    login: Function;
    logout: Function;
    resetPassword: Function;
    updateEmail: Function;
    updatePassword: Function;
    updateFilters: Function;
    updateFilteredOptions: Function;
    updateCheckedFilters: Function;
    updateFilteredProducts: Function;
    updateActiveMenu: Function;
    updateActiveMenuItem: Function;
    updateLoading: Function;
}

export const defaultMenuItems: MenuItems[] = [ {
    url: '',
    title: ''
} ];

export const defaultGlobalProviderData: GlobalProviderData = {
    menuItems: [],
    currentUser: undefined,
    products: [],
    categories: [],
    subCategories: [],
    favourites: [],
    filters: [],
    filteredOptions: [],
    checkedFilters: {},
    filteredProducts: [] as Product[],
    activeMenu: { 'home': true },
    loading: false
};

export const GlobalContext = createContext<GlobalContextProps>({
    data: defaultGlobalProviderData,
    updateMenuItems: Function,
    updateCurrentUser: Function,
    updateProducts: Function,
    updateCategories: Function,
    updateSubCategories: Function,
    updateFavourites: Function,
    updateFavouritesCollection: Function,
    signup: Function,
    login: Function,
    logout: Function,
    resetPassword: Function,
    updateEmail: Function,
    updatePassword: Function,
    updateFilters: Function,
    updateFilteredOptions: Function,
    updateCheckedFilters: Function,
    updateFilteredProducts: Function,
    updateActiveMenu: Function,
    updateActiveMenuItem: Function,
    updateLoading: Function
});

export const GlobalProvider: React.FC = ({ children }) => {
    const [ providerValue, setProviderValue ] = useState( defaultGlobalProviderData );
    const productsFirestore = useFirestore( 'products' );
    const categories = useFirestore( 'categories' );
    const subCategoriesFirestore = useFirestore( 'subcategories' );
    const favouritesFirestore = useFirestore( 'favourites' );

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

    const updateCurrentUser = ( currentUser: firebase.User | null ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, currentUser };
        });
    };

    const updateProducts = ( products: Product[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, products };
        });

        updateLoading( false );
    };

    const updateCategories = ( categories: Category[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, categories };
        });

        updateLoading( false );
    };

    const updateSubCategories = ( subCategories: SubCategory[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, subCategories };
        });

        updateLoading( false );
    };

    const updateFavourites = ( favourites: Favourite[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, favourites };
        });

        updateLoading( false );
    };

    const updateFilters = ( filters: Filter[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, filters };
        });

        updateLoading( false );
    };

    const updateFilteredOptions = ( filteredOptions: [] ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, filteredOptions };
        });

        updateLoading( false );
    };

    const updateCheckedFilters = ( checkedFilters: any ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, checkedFilters };
        });

        updateLoading( false );
    };

    const updateFilteredProducts = ( filteredProducts: Product[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, filteredProducts };
        });

        updateLoading( false );
    };

    const updateActiveMenu = ( activeMenu: {[key:string]: boolean}): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, activeMenu };
        });

        updateLoading( false );
    };

    const updateActiveMenuItem = ( menuItem: string ): void => {
        const activeMenuTemp = JSON.parse( JSON.stringify( providerValue.activeMenu ) );
        Object.keys( activeMenuTemp ).forEach( ( item ) => {
            activeMenuTemp[ item ] = false;
        });
        activeMenuTemp[ menuItem ] = true;
        updateActiveMenu( activeMenuTemp );
    };

    const updateFavouritesCollection = ( uid: any, prods: any ): void => {
        favouritesFirestore.updateCollection( uid, prods );
        updateFavourites( favouritesFirestore.docs );
    };

    const signup = ( email: string, password: string ): Promise<firebase.auth.UserCredential> => {
        return auth.createUserWithEmailAndPassword( email, password );
    };

    const login = ( email: string, password: string ): Promise<firebase.auth.UserCredential> => {
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
        if ( productsFirestore.docs.length !== providerValue.products.length ) {
            updateProducts( productsFirestore.docs );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ productsFirestore ] );

    useEffect( (): void => {
        if ( categories.docs.length > 0 && providerValue.categories.length === 0 ) {
            updateCategories( categories.docs );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ categories ] );

    useEffect( (): void => {
        if ( subCategoriesFirestore.docs.length > 0 && providerValue.subCategories.length === 0 ) {
            updateSubCategories( subCategoriesFirestore.docs );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ subCategoriesFirestore ] );

    useEffect( (): void => {
        if ( ( favouritesFirestore.docs.length > 0 && providerValue.favourites.length === 0 ) ||
        ( !!favouritesFirestore.docs.length && providerValue.favourites !== favouritesFirestore.docs ) ) {
            updateFavourites( favouritesFirestore.docs );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ favouritesFirestore ] );

    useEffect( ():void => {
        if ( providerValue.categories.length > 0 &&
            !providerValue.filters.some( r => providerValue.categories
                .map( ( item ) => { return item.name; }).indexOf( r.name ) >= 0 ) ) {
            const newFiltered = [ ...providerValue.filters ];

            providerValue.categories.forEach( ( item ) => {
                const filtered = providerValue.products.filter( ( prod ) => {
                    return prod.categoryId.toString() === item.id.toString();
                });
                newFiltered.push({
                    'name': item.name.toString(),
                    'products': filtered.map( filt => filt.id )
                });
            });
            updateFilters( newFiltered.sort( ( a, b ) => ( a.name > b.name ) ? 1 : -1 ) );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ providerValue.categories ] );

    const providerData = {
        data: providerValue,
        updateMenuItems,
        updateCurrentUser,
        updateProducts,
        updateCategories,
        updateSubCategories,
        updateFavourites,
        updateFavouritesCollection,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateFilters,
        updateFilteredOptions,
        updateCheckedFilters,
        updateFilteredProducts,
        updateActiveMenu,
        updateActiveMenuItem,
        updateLoading
    };

    return (
        <GlobalContext.Provider value={ providerData }>
            { children }
        </GlobalContext.Provider>
    );
};
