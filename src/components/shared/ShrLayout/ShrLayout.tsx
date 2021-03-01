import React from 'react';
import ShrHeader from '../ShrHeader/ShrHeader';
import ShrFooter from '../ShrFooter/ShrFooter';
import './ShrLayout.scss';

type ShrLayoutProps = {
    showSignIn?: boolean;
    showSignUp?: boolean;
    showCategories?: boolean;
}

const ShrLayout: React.FC<ShrLayoutProps> = ({ showSignIn, showSignUp, showCategories, children }) => {
    return (
        <div className='shr-layout'>
            <ShrHeader
                showSignIn={showSignIn}
                showSignUp={showSignUp}
                showCategories={showCategories} />
            {children}
            <ShrFooter />
        </div>
    );
};

ShrHeader.defaultProps = {
    showSignIn: true,
    showSignUp: true,
    showCategories: true
};

export default ShrLayout;
