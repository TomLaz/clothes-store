export interface UserProfileStates {
    home: string;
    mens: string;
    womens: string;
    summer: string;
    outlet: string;
    signUp: string;
    signIn: string;
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
            signIn: '/ingresar'
        };
    }
}

export default GlobalService;
