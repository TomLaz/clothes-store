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
            mens: '/hombres',
            womens: '/mujeres',
            signUp: '/registrar',
            signIn: '/ingresar',
            forgotPassword: '/olvide-password',
            userProfile: '/perfil-usuario',
            uploadProduct: '/subir-producto',
            addProduct: '/agregar-producto',
            basket: '/carro-compras',
            products: '/productos',
            favourites: '/favoritos'
        };
    }
}

export default GlobalService;
