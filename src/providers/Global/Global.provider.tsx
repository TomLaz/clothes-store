import React, { createContext, useState, useEffect } from 'react';
import { MenuItems, Product, Category, SubCategory, Filter, ProductProperties } from './Global.model';
import { auth } from '../../firebase/firebase';
import useFirestore from '../../firebase/useFirestore';
import firebase from 'firebase/app';

export interface GlobalProviderData {
    menuItems: MenuItems[];
    currentUser: any;
    products: Product[];
    categories: Category[];
    subCategories: SubCategory[];
    favourites: string[] | undefined;
    filters: Filter[];
    filteredOptions: string[];
    checkedFilters: any;
    filteredProducts: Product[];
    basketProducts: ProductProperties[] | undefined;
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
    updateBasketProducts: Function;
    updateBasketProductsCollection: Function;
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
    favourites: undefined,
    filters: [],
    filteredOptions: [],
    checkedFilters: {},
    filteredProducts: [] as Product[],
    basketProducts: undefined,
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
    updateBasketProducts: Function,
    updateBasketProductsCollection: Function,
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
    const basketProductsFirestore = useFirestore( 'basket' );

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

    const updateFavourites = ( favourites: string[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, favourites };
        });

        updateLoading( false );
    };

    const updateBasketProducts = ( basketProducts: ProductProperties[] ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, basketProducts };
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

    const updateFavouritesCollection = ( prods: any ): void => {
        favouritesFirestore.updateCollection( providerValue.currentUser.uid, prods );

        updateFavourites( prods );
    };

    const updateBasketProductsCollection = ( basketProducts: ProductProperties[] ): void => {
        basketProductsFirestore.updateCollection( providerValue.currentUser.uid, basketProducts );

        updateBasketProducts( basketProducts );
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

    const updatePassword = ( password: string ): Promise<void> => {
        return providerValue.currentUser.updatePassword( password );
    };

    useEffect( () => {
        let isUnmounted = false;

        auth.onAuthStateChanged( user => {
            if ( !isUnmounted ) {
                updateCurrentUser( user );
            }
        });

        return () => {
            isUnmounted = true;
        };
    }, [] );

    useEffect( () => {
        let isUnmounted = false;

        if ( productsFirestore.docs.length !== providerValue.products.length ) {
            if ( !isUnmounted ) {
                updateProducts( productsFirestore.docs );
            }
        }

        return () => {
            isUnmounted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ productsFirestore ] );

    useEffect( () => {
        let isUnmounted = false;

        if ( categories.docs.length > 0 && providerValue.categories.length === 0 ) {
            if ( !isUnmounted ) {
                updateCategories( categories.docs );
            }
        }

        return () => {
            isUnmounted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ categories ] );

    useEffect( () => {
        let isUnmounted = false;

        if ( subCategoriesFirestore.docs.length > 0 && providerValue.subCategories.length === 0 ) {
            if ( !isUnmounted ) {
                updateSubCategories( subCategoriesFirestore.docs );
            }
        }

        return () => {
            isUnmounted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ subCategoriesFirestore ] );

    useEffect( () => {
        let isUnmounted = false;

        if ( favouritesFirestore.docs.length > 0 &&
            providerValue.favourites === undefined &&
            providerValue.currentUser !== undefined &&
            providerValue.currentUser !== null ) {
            const favs = favouritesFirestore.docs.filter( item => item.id === providerData.data.currentUser.uid ).length > 0 ?
                favouritesFirestore.docs.filter( item => item.id === providerData.data.currentUser.uid )[0].products :
                [];

            providerValue.favourites = providerValue.favourites === undefined ? [] : providerValue.favourites;

            if ( favs !== providerValue.favourites ) {
                if ( !isUnmounted ) {
                    updateFavourites( favs );
                }
            }
        }

        return () => {
            isUnmounted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ favouritesFirestore ] );

    useEffect( () => {
        let isUnmounted = false;

        if ( basketProductsFirestore.docs.length > 0 &&
            providerValue.basketProducts === undefined &&
            providerValue.currentUser !== undefined &&
            providerValue.currentUser !== null ) {
            const prods = basketProductsFirestore.docs.filter( ( item ) => item.id === providerValue.currentUser.uid ).length > 0 ?
                basketProductsFirestore.docs.filter( ( item ) => item.id === providerValue.currentUser.uid )[0].products :
                [];

            providerValue.basketProducts = providerValue.basketProducts === undefined ? [] : providerValue.basketProducts;

            if ( prods.length !== providerValue.basketProducts.length ) {
                if ( !isUnmounted ) {
                    updateBasketProducts( prods );
                }
            }
        }

        return () => {
            isUnmounted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ basketProductsFirestore ] );

    useEffect( () => {
        let isUnmounted = false;

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
            if ( !isUnmounted ) {
                updateFilters( newFiltered.sort( ( a, b ) => ( a.name > b.name ) ? 1 : -1 ) );
            }
        }

        return () => {
            isUnmounted = true;
        };
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
        updateBasketProducts,
        updateBasketProductsCollection,
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
