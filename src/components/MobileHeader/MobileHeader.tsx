import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ShrButton, { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../shared/ShrButton/ShrButton';
import i18n from '../../i18n';
import { ProductProperties } from '../../providers/Global/Global.model';
import './MobileHeader.scss';

type MobileHeaderProps = {
    showSignIn?: boolean;
    showSignUp?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ showSignIn, showSignUp }) => {
    const history = useHistory();
    const { data: { currentUser, activeMenu, basketProducts },
        logout, updateActiveMenuItem } = useContext( GlobalContext );
    const [ showMenu, setShowMenu ] = useState( false );

    const basketQty = ( basketProducts !== undefined && basketProducts.length > 0 ) ?
        basketProducts.map( ( prod: ProductProperties ) => Number( prod.quantity ) )
            .reduce( ( a: number, b: number ) => a + b, 0 ) : 0;

    const redirectTo = ( activeMenu: string, url: string ): void => {
        updateActiveMenuItem( activeMenu );
        history.push( url );
    };

    return (
        <div className='mobile-header'>
            <div className='mobile-header__bar'>
                <div
                    className='mobile-header__brand'
                    onClick={(): void => redirectTo( 'home', GlobalService.states.home )}>
                    {i18n.t( 'global.brand' )}
                </div>
                <div className='mobile-header__actions'>
                    {
                        currentUser &&
                        <>
                            <IconButton
                                onClick={(): void => redirectTo( 'favourites', GlobalService.states.favourites )}
                                className='mobile-header__favourites'
                                color='primary'
                                aria-label={i18n.t( 'global.favourites' )}
                                title={i18n.t( 'global.favourites' )}
                                component='span'>
                                <FavoriteIcon />
                            </IconButton>
                            <div
                                className='mobile-header__basket'
                                aria-label={i18n.t( 'mobile-header.basket' )}
                                title={i18n.t( 'mobile-header.basket' )}
                                onClick={( (): void => history.push( GlobalService.states.basket ) )}>
                                <ShoppingBasket  />
                                <span className='mobile-header__basket-qty'>
                                    {
                                        ( basketProducts !== undefined && basketProducts.length > 0 ) ?
                                            basketQty : 0
                                    }
                                </span>
                            </div>
                        </>
                    }
                    <p
                        className='mobile-header__burger'
                        onClick={ (): void => setShowMenu( !showMenu ) }>
                        <span className='mobile-header__burger-span'></span>
                        <span className='mobile-header__burger-span'></span>
                        <span className='mobile-header__burger-span'></span>
                    </p>
                </div>
            </div>
            <div className={
                showMenu ?
                    'mobile-header__menu mobile-header__show' :
                    'mobile-header__menu'}>
                <div className='mobile-header__sign'>
                    {
                        ( !currentUser && showSignUp ) &&
                        <div className='mobile-header__sign-up'>
                            <ShrButton
                                fullWidth={true}
                                variant={ButtonVariant.outlined}
                                color={ButtonColor.primary}
                                type={ButtonType.button}
                                title={i18n.t( 'sign-up' )}
                                size={ButtonSize.small}
                                action={( (): void => history.push( GlobalService.states.signUp ) )} />
                        </div>
                    }
                    {
                        ( !currentUser && showSignIn ) &&
                        <div className='mobile-header__sign-in'>
                            <ShrButton
                                fullWidth={true}
                                variant={ButtonVariant.outlined}
                                color={ButtonColor.primary}
                                type={ButtonType.button}
                                title={i18n.t( 'sign-in' )}
                                size={ButtonSize.small}
                                action={( (): void => history.push( GlobalService.states.signIn ) )} />
                        </div>
                    }
                    {
                        currentUser &&
                        <div className='mobile-header__log-out'>
                            <ShrButton
                                fullWidth={true}
                                variant={ButtonVariant.outlined}
                                color={ButtonColor.primary}
                                type={ButtonType.button}
                                title={i18n.t( 'global.log-out' )}
                                size={ButtonSize.small}
                                action={( async (): Promise<void> => await logout() )} />
                        </div>
                    }
                    {
                        currentUser &&
                        <div className='mobile-header__user-profile'>
                            <ShrButton
                                fullWidth={true}
                                variant={ButtonVariant.outlined}
                                color={ButtonColor.primary}
                                type={ButtonType.button}
                                title={i18n.t( 'global.user-profile' )}
                                size={ButtonSize.small}
                                action={( (): void => history.push( GlobalService.states.userProfile ) )} />
                        </div>
                    }
                </div>
                <div
                    className={activeMenu[ 'home' ] ?
                        'mobile-header__option mobile-header__menu-home mobile-header__active' :
                        'mobile-header__option mobile-header__menu-home'}
                    onClick={(): void => redirectTo( 'home', GlobalService.states.home )}>
                    {i18n.t( 'global.home' )}
                </div>
                <div
                    className={activeMenu[ 'favourites' ] ?
                        'mobile-header__option mobile-header__menu-favourites mobile-header__active' :
                        'mobile-header__option mobile-header__menu-favourites'}
                    onClick={(): void => redirectTo( 'favourites', GlobalService.states.favourites )}>
                    {i18n.t( 'global.favourites' )}
                </div>
                <div
                    className={activeMenu[ 'products' ] ?
                        'mobile-header__option mobile-header__menu-products mobile-header__active' :
                        'mobile-header__option mobile-header__menu-products'}
                    onClick={(): void => redirectTo( 'products', GlobalService.states.products )}>
                    {i18n.t( 'products.title' )}
                </div>
            </div>
        </div>
    );
};

MobileHeader.defaultProps = {
    showSignIn: true,
    showSignUp: true
};

export default MobileHeader;
