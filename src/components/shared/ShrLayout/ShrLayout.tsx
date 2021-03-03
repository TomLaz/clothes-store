import React from 'react';
import ShrHeader from '../ShrHeader/ShrHeader';
import ShrFooter from '../ShrFooter/ShrFooter';

type ShrLayoutProps = {
    showSignIn?: boolean;
    showSignUp?: boolean;
    showCategories?: boolean;
}

const ShrLayout: React.FC<ShrLayoutProps> = ({ showSignIn, showSignUp, showCategories, children }) => {
    return (
        <React.Fragment>
            <ShrHeader
                showSignIn={showSignIn}
                showSignUp={showSignUp}
                showCategories={showCategories} />
            {children}
            <ShrFooter />
        </React.Fragment>
    );
};

ShrHeader.defaultProps = {
    showSignIn: true,
    showSignUp: true,
    showCategories: true
};

export default ShrLayout;
