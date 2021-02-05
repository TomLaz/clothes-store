export interface UserProfileStates {
    home: string;
    mens: string;
    womens: string;
    summer: string;
    outlet: string;
    signUp: string;
    signIn: string;
    forgotPassword: string;
    userProfile: string;
    uploadProduct: string;
    productDetail: string;
    basket: string;
    products: string;
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
            summer: '/verano',
            outlet: '/outlet',
            signUp: '/registrar',
            signIn: '/ingresar',
            forgotPassword: '/olvide-password',
            userProfile: '/perfil-usuario',
            uploadProduct: '/subir-producto',
            productDetail: '/detalle-producto',
            basket: '/carro-compras',
            products: '/productos'
        };
    }
}

export default GlobalService;
