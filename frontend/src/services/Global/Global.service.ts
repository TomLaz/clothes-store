import api, { getUrl } from '../../utils/api/api';
import jwt_decode from 'jwt-decode';
import { BasketI, CategoryI, FavoritesI, ProductI } from '../../models/Global.model';

export interface UserProfileStates {
    home: string;
    mens: string;
    womens: string;
    signUp: string;
    signIn: string;
    userProfile: string;
    addProduct: string;
    basket: string;
    products: string;
    favourites: string;
}

class GlobalService {
    /**
     * Returns the routes for child components
    */
    static get states(): UserProfileStates {
        return {
            home: '/',
            mens: '/mens',
            womens: '/womens',
            signUp: '/signup',
            signIn: '/login',
            userProfile: '/my-profile',
            addProduct: '/add-product',
            basket: '/basket',
            products: '/products',
            favourites: '/favorites'
        };
    }

    /**
     * Login user
     * @param email Email
     * @param password Password
     */
    static login = ( email: string, password: string ): Promise<string> => {
        return new Promise( ( resolve, reject ) => {
            const params = {
                'email': email,
                'password': password
            };

            api().post( getUrl.login, params )
                .then( response => {
                    resolve( response.data.access_token );
                })
                .catch( error => {
                    reject( error.response.data );
                });
        });
    }

    /**
     * Register user
     * @param email Email
     * @param password Password
     */
    static register = ( email: string, password: string ): Promise<string> => {
        return new Promise( ( resolve, reject ) => {
            const params = {
                'email': email,
                'password': password
            };

            api().post( getUrl.register, params )
                .then( response => {
                    resolve( response.data.access_token );
                })
                .catch( error => {
                    reject( error.response.data );
                });
        });
    }

    /**
     * Reset password
     * @param email Email
     * @param password Password
    */
    static resetPassword = ( email: string ): Promise<string> => {
        return new Promise( ( resolve, reject ) => {
            const params = {
                'email': email
            };

            api().post( getUrl.reset, params )
                .then( response => {
                    resolve( response.data.access_token );
                })
                .catch( error => {
                    reject( error.response.data );
                });
        });
    }

    /**
     * Update password
     * @param email Email
     * @param password Password
    */
    static updatePassword = ( token: string, currentPassword: string, password: string ): Promise<string> => {
        return new Promise( ( resolve, reject ) => {
            const params = {
                'currentPassword': currentPassword,
                'password': password
            };

            api( token ).put( getUrl.update, params )
                .then( response => {
                    resolve( response.data.access_token );
                })
                .catch( error => {
                    reject( error.response.data );
                });
        });
    }

    /**
     * Get products
     * @param token Token
     */
    static getProducts = (): Promise<ProductI[]> => {
        return new Promise( ( resolve, reject ) => {
            api().get( getUrl.products )
                .then( ( response ) => {
                    resolve( response.data );
                })
                .catch( () => {
                    reject();
                });
        });
    }

    /**
     * Get categories
     */
    static getCategories = (): Promise<CategoryI[]> => {
        return new Promise( ( resolve, reject ) => {
            api().get( getUrl.categories )
                .then( ( response ) => {
                    resolve( response.data );
                })
                .catch( () => {
                    reject();
                });
        });
    }

    /**
     * Get favorites
     * @param token Token
     */
    static getFavorites = ( token: string ): Promise<FavoritesI> => {
        return new Promise( ( resolve, reject ) => {
            api( token ).get( getUrl.favourites )
                .then( ( response ) => {
                    resolve( response.data );
                })
                .catch( () => {
                    reject();
                });
        });
    }

    /**
     * Add/Update User Favourites
     * @param token Token
     * @param favourites Favourites
    */
    static updateFavourites = ( token: string, favourites: FavoritesI ): Promise<void> => {
        return new Promise( ( resolve, reject ) => {
            const params = {
                id: +favourites.id,
                products: favourites.products
            };

            api( token ).put( getUrl.favourites, params )
                .then( () => {
                    resolve();
                })
                .catch( () => {
                    reject();
                });
        });
    }

    /**
     * Get basket
     * @param token Token
     */
    static getBasket = ( token: string ): Promise<BasketI> => {
        return new Promise( ( resolve, reject ) => {
            api( token ).get( getUrl.basket )
                .then( ( response ) => {
                    resolve( response.data );
                })
                .catch( () => {
                    reject();
                });
        });
    }

    /**
     * Add/Update User Basket
     * @param token Token
     * @param basket Basket
    */
    static updateBasket = ( token: string, basket: BasketI ): Promise<void> => {
        return new Promise( ( resolve, reject ) => {
            const params = {
                id: +basket.id,
                products: basket.products
            };

            api( token ).put( getUrl.basket, params )
                .then( () => {
                    resolve();
                })
                .catch( () => {
                    reject();
                });
        });
    }

    /**
     * Get role from token
     * @param tokenProp Token
     */
    static getRole = ( tokenProp: string ): string => {
        const data: { role: string } = jwt_decode( tokenProp );
        return data.role;
    }

    /**
     * Get email from token
     * @param tokenProp Token
     */
    static getEmail = ( tokenProp: string ): string => {
        const data: { email: string } = jwt_decode( tokenProp );
        return data.email;
    }

    /**
     * Get Id from token
     * @param tokenProp Token
     */
    static getId = ( tokenProp: string ): string => {
        const data: { id: string } = jwt_decode( tokenProp );
        return data.id;
    }
}

export default GlobalService;
