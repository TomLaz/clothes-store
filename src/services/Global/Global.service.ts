export interface UserProfileStates {
    home: string;
    mens: string;
    womens: string;
    signUp: string;
    signIn: string;
    forgotPassword: string;
    userProfile: string;
    uploadProduct: string;
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
            forgotPassword: '/forget-password',
            userProfile: '/my-profile',
            uploadProduct: '/upload-product',
            addProduct: '/add-product',
            basket: '/basket',
            products: '/products',
            favourites: '/favorites'
        };
    }
}

export default GlobalService;
