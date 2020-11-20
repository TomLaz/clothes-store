import React from 'react';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import './SignIn.scss';

const SignIn: React.FC = () => {
    return (
        <div className='sign-in'>
            <ShrHeader showSignIn={false} />
            SignIn
        </div>
    );
};

export default SignIn;
