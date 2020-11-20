import React from 'react';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import './SignUp.scss';

const SignUp: React.FC = () => {
    return (
        <div className='sign-up'>
            <ShrHeader showSignUp={false} />
            SignUp
        </div>
    );
};

export default SignUp;
