import React, { createContext, useState, useEffect } from 'react';
import GlobalService from '../../services/Global/Global.service';
import { BasketI, CategoryI, FavoritesI, FilterI, MenuItemsI, ProductI } from '../../models/Global.model';

export interface GlobalProviderData {
    jwt: string | null;
    role: string | null;
    email: string | null | undefined;
    menuItems: MenuItemsI[];
    products: ProductI[];
    categories: CategoryI[];
    favourites: FavoritesI | undefined;
    basket: BasketI | undefined;
    filters: FilterI[];
    filteredOptions: string[];
    checkedFilters: any;
    filteredProducts: ProductI[];
    activeMenu: {[key:string]: boolean};
    loading: boolean;
}

export interface GlobalContextProps {
    data: GlobalProviderData;
    updateJwt: Function;
    updateRole: Function;
    updateEmail: Function;
    updateFavourites: Function;
    updateBasket: Function;
    updateFilters: Function;
    updateFilteredOptions: Function;
    updateCheckedFilters: Function;
    updateFilteredProducts: Function;
    updateActiveMenu: Function;
    updateActiveMenuItem: Function;
    noUserLogged: Function;
    updateLoading: Function;
}

export const defaultMenuItems: MenuItemsI[] = [ {
    url: '',
    title: ''
} ];

export const defaultGlobalProviderData: GlobalProviderData = {
    jwt: null,
    role: null,
    email: null,
    menuItems: [],
    products: [] as ProductI[],
    categories: [] as CategoryI[],
    favourites: undefined,
    filters: [] as FilterI[],
    filteredOptions: [],
    checkedFilters: {},
    filteredProducts: [] as ProductI[],
    basket: undefined,
    activeMenu: { 'home': true },
    loading: false
};

export const GlobalContext = createContext<GlobalContextProps>({
    data: defaultGlobalProviderData,
    updateJwt: Function,
    updateRole: Function,
    updateEmail: Function,
    updateFavourites: Function,
    updateBasket: Function,
    updateFilters: Function,
    updateFilteredOptions: Function,
    updateCheckedFilters: Function,
    updateFilteredProducts: Function,
    updateActiveMenu: Function,
    updateActiveMenuItem: Function,
    noUserLogged: Function,
    updateLoading: Function
});

export const GlobalProvider: React.FC = ({ children }) => {
    const [ providerValue, setProviderValue ] = useState( defaultGlobalProviderData );

    const updateLoading = ( loading: boolean ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, loading };
        });
    };

    const updateJwt = ( jwt: string | null ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, jwt };
        });
    };

    const updateRole = ( role: string | null ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, role };
        });
    };

    const updateEmail = ( email: string | undefined ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, email };
        });
    };

    const updateProducts = ( products: ProductI[] ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, products };
        });
    };

    const updateCategories = ( categories: CategoryI[] ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, categories };
        });
    };

    const updateFavourites = ( favourites: FavoritesI | undefined ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, favourites };
        });
    };

    const updateBasket = ( basket: BasketI | undefined ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, basket };
        });
    };

    const updateFilters = ( filters: FilterI[] ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, filters };
        });
    };

    const updateFilteredOptions = ( filteredOptions: [] ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, filteredOptions };
        });
    };

    const updateCheckedFilters = ( checkedFilters: any ): void => {
        updateLoading( true );

        setProviderValue( ( prevValues ) => {
            return { ...prevValues, checkedFilters };
        });

        updateLoading( false );
    };

    const updateFilteredProducts = ( filteredProducts: ProductI[] ): void => {
        setProviderValue( ( prevValues ) => {
            return { ...prevValues, filteredProducts };
        });
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

    const noUserLogged = (): any => {
        updateJwt( '' );
        updateRole( '' );
        updateEmail( undefined );
        updateFavourites( undefined );
        updateBasket( undefined );
        localStorage.clear();
    };

    useEffect( (): void => {
        ( async (): Promise<void> => {
            updateLoading( true );

            const [ products, categories ] = await Promise.all( [
                GlobalService.getProducts(),
                GlobalService.getCategories()
            ] );

            updateProducts( products as ProductI[] );
            updateCategories( categories as CategoryI[] );

            const token = localStorage.getItem( 'token' );
            if ( token ) {
                try {
                    const [ favourites, basket ] = await Promise.all( [
                        GlobalService.getFavorites( token ),
                        GlobalService.getBasket( token )
                    ] );

                    updateJwt( token );
                    updateRole( GlobalService.getRole( token ) );
                    updateEmail( GlobalService.getEmail( token ) );

                    updateFavourites( favourites || {
                        id: GlobalService.getId( token ),
                        products: []
                    });
                    updateBasket( basket || {
                        id: GlobalService.getId( token ),
                        products: []
                    });
                } catch {
                    noUserLogged();
                }
            } else {
                noUserLogged();
            }

            updateLoading( false );
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

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

            !isUnmounted && updateFilters( newFiltered.sort( ( a, b ) => ( a.name > b.name ) ? 1 : -1 ) );
        }

        return () => {
            isUnmounted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ providerValue.categories ] );

    const providerData = {
        data: providerValue,
        updateJwt,
        updateRole,
        updateEmail,
        updateFavourites,
        updateBasket,
        updateFilters,
        updateFilteredOptions,
        updateCheckedFilters,
        updateFilteredProducts,
        updateActiveMenu,
        updateActiveMenuItem,
        noUserLogged,
        updateLoading
    };

    return (
        <GlobalContext.Provider value={ providerData }>
            { children }
        </GlobalContext.Provider>
    );
};
