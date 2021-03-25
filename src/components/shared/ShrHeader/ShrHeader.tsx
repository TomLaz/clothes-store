import React, { useContext, useEffect } from 'react';
import MobileHeader from '../../MobileHeader/MobileHeader';
import DesktopHeader from '../../DesktopHeader/DesktopHeader';
import { GlobalContext } from '../../../providers/Global/Global.provider';
import './ShrHeader.scss';

type ShrHeaderProps = {
    showSignIn?: boolean;
    showSignUp?: boolean;
    showCategories?: boolean;
}

const ShrHeader: React.FC<ShrHeaderProps> = ({ showSignIn, showSignUp, showCategories }) => {
    const { data: { filters, activeMenu }, updateActiveMenu } = useContext( GlobalContext );

    useEffect( () => {
        let isUnmounted = false;

        if ( filters.length > 0 && Object.keys( activeMenu ).length === 1 ) {
            const activeMenuTemp = JSON.parse( JSON.stringify( activeMenu ) );

            filters.forEach( ( item ) => {
                activeMenuTemp[ item.name.toLowerCase() ] = false;
            });

            if ( !isUnmounted ) {
                updateActiveMenu( activeMenuTemp );
            }
        }

        return () => {
            isUnmounted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filters ] );

    return (
        <header className='shr-header'>
            <MobileHeader showSignIn={showSignIn} showSignUp={showSignUp} />
            <DesktopHeader showSignIn={showSignIn} showSignUp={showSignUp} showCategories={showCategories} />
            <div className='shr-header__span' />
        </header>
    );
};

ShrHeader.defaultProps = {
    showSignIn: true,
    showSignUp: true,
    showCategories: true
};

export default ShrHeader;
