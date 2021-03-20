import React, { useContext, useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useHistory } from 'react-router-dom';
import i18n from '../../../i18n';
import { GlobalContext } from '../../../providers/Global/Global.provider';
import GlobalService from '../../../services/Global/Global.service';
import ShrButton, { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../ShrButton/ShrButton';
import './ShrHeader.scss';
import { BasketProducts, ProductProperties } from '../../../providers/Global/Global.model';

type ShrHeaderProps = {
    showSignIn?: boolean;
    showSignUp?: boolean;
    showCategories?: boolean;
}

const ShrHeader: React.FC<ShrHeaderProps> = ({ showSignIn, showSignUp, showCategories }) => {
    const history = useHistory();
    const [ showMenu, setShowMenu ] = useState( false );
    const { data: { currentUser, filters, activeMenu, basketProducts },
        logout, updateFilteredOptions, updateCheckedFilters,
        updateFilteredProducts, updateActiveMenu, updateActiveMenuItem } = useContext( GlobalContext );

    const productsToBuy: BasketProducts[] = !!currentUser ? basketProducts.filter( item => item.id === currentUser.uid ) || [] : [];

    const basketQty = productsToBuy.length > 0 ?
        productsToBuy[0].products.map( ( prod: ProductProperties ) => Number( prod.quantity ) )
            .reduce( ( a: number, b: number ) => a + b, 0 ) : 0;

    useEffect( (): void => {
        if ( filters.length > 0 && Object.keys( activeMenu ).length === 1 ) {
            const activeMenuTemp = JSON.parse( JSON.stringify( activeMenu ) );

            filters.forEach( ( item ) => {
                activeMenuTemp[ item.name.toLowerCase() ] = false;
            });

            updateActiveMenu( activeMenuTemp );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filters ] );

    return (
        <header className='shr-header'>
            <div className='shr-header__mobile'>
                <div className='shr-header__mobile-bar'>
                    <div
                        className='shr-header__mobile-brand'
                        onClick={(): void => {
                            updateActiveMenuItem( 'home' );
                            history.push( GlobalService.states.home );
                        }}>
                        {i18n.t( 'global.brand' )}
                    </div>
                    <div className='shr-header__mobile-actions'>
                        {
                            currentUser &&
                            <>
                                <IconButton
                                    onClick={( (): void => {
                                        const activeMenuTemp = JSON.parse( JSON.stringify( activeMenu ) );
                                        Object.keys( activeMenuTemp ).forEach( ( item ) => {
                                            activeMenuTemp[ item ] = false;
                                        });
                                        activeMenuTemp[ 'favourites' ] = true;
                                        updateActiveMenu( activeMenuTemp );

                                        history.push( GlobalService.states.favourites );
                                    })}
                                    className='shr-header__mobile-favourites'
                                    color='primary'
                                    aria-label={i18n.t( 'shr-header.favourites' )}
                                    title={i18n.t( 'shr-header.favourites' )}
                                    component='span'>
                                    <FavoriteIcon />
                                </IconButton>
                                <div
                                    className='shr-header__mobile-basket'
                                    aria-label={i18n.t( 'shr-header.basket' )}
                                    title={i18n.t( 'shr-header.basket' )}
                                    onClick={( (): void => history.push( GlobalService.states.basket ) )}>
                                    <ShoppingBasket  />
                                    <span className='shr-header__mobile-basket-qty'>
                                        {
                                            productsToBuy.length > 0 ?
                                                basketQty : 0
                                        }
                                    </span>
                                </div>
                            </>
                        }
                        <p
                            className='shr-header__mobile-burger'
                            onClick={ (): void => setShowMenu( !showMenu ) }>
                            <span className='shr-header__mobile-burger-span'></span>
                            <span className='shr-header__mobile-burger-span'></span>
                            <span className='shr-header__mobile-burger-span'></span>
                        </p>
                    </div>
                </div>
                <div className={
                    showMenu ?
                        'shr-header__mobile-menu shr-header__mobile-show' :
                        'shr-header__mobile-menu'}>
                    <div className='shr-header__mobile-sign'>
                        {
                            ( !currentUser && showSignUp ) &&
                            <div className='shr-header__mobile-sign-up'>
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
                            <div className='shr-header__mobile-sign-in'>
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
                            <div className='shr-header__mobile-log-out'>
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
                            <div className='shr-header__mobile-user-profile'>
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
                            'shr-header__mobile-option shr-header__mobile-menu-home shr-header__mobile-active' :
                            'shr-header__mobile-option shr-header__mobile-menu-home'}
                        onClick={ (): void => {
                            const activeMenuTemp = JSON.parse( JSON.stringify( activeMenu ) );
                            Object.keys( activeMenuTemp ).forEach( ( item ) => {
                                activeMenuTemp[ item ] = false;
                            });
                            activeMenuTemp[ 'home' ] = true;
                            updateActiveMenu( activeMenuTemp );

                            history.push( GlobalService.states.home );
                        }}>
                        {i18n.t( 'global.home' )}
                    </div>
                    <div
                        className={activeMenu[ 'favourites' ] ?
                            'shr-header__mobile-option shr-header__mobile-menu-favourites shr-header__mobile-active' :
                            'shr-header__mobile-option shr-header__mobile-menu-favourites'}
                        onClick={ (): void => {
                            const activeMenuTemp = JSON.parse( JSON.stringify( activeMenu ) );
                            Object.keys( activeMenuTemp ).forEach( ( item ) => {
                                activeMenuTemp[ item ] = false;
                            });
                            activeMenuTemp[ 'favourites' ] = true;
                            updateActiveMenu( activeMenuTemp );

                            history.push( GlobalService.states.favourites );
                        }}>
                        {i18n.t( 'shr-header.favourites' )}
                    </div>
                    <div
                        className={activeMenu[ 'products' ] ?
                            'shr-header__mobile-option shr-header__mobile-menu-products shr-header__mobile-active' :
                            'shr-header__mobile-option shr-header__mobile-menu-products'}
                        onClick={ (): void => {
                            const activeMenuTemp = JSON.parse( JSON.stringify( activeMenu ) );
                            Object.keys( activeMenuTemp ).forEach( ( item ) => {
                                activeMenuTemp[ item ] = false;
                            });
                            activeMenuTemp[ 'products' ] = true;
                            updateActiveMenu( activeMenuTemp );

                            history.push( GlobalService.states.products );
                        }}>
                        {i18n.t( 'products.title' )}
                    </div>
                </div>
            </div>
            <div className='shr-header__desktop'>
                <div className='shr-header__desktop-info'>
                    <span
                        className='shr-header__desktop-dev'
                        onClick={(): void => {
                            updateActiveMenuItem( 'home' );
                            history.push( GlobalService.states.home );
                        }}>
                        {i18n.t( 'global.brand' )}
                    </span>
                    <span className='shr-header__desktop-social'>
                        <FacebookIcon className='shr-header__desktop-facebook' />
                        <InstagramIcon className='shr-header__desktop-instagram' />
                        <TwitterIcon className='shr-header__desktop-twitter' />
                        <YouTubeIcon className='shr-header__desktop-youtube' />
                    </span>
                </div>
                <div className='shr-header__desktop-actions'>
                    <div className='shr-header__desktop-options'>
                        {
                            filters.length > 0 &&
                            showCategories &&
                            filters.map( ( option, key ) => {
                                return (
                                    <div
                                        key={key}
                                        className='shr-header__desktop-option'
                                        onClick={( (): void => {
                                            updateActiveMenuItem( 'products' );
                                            updateCheckedFilters({});
                                            updateFilteredProducts( [] );
                                            updateFilteredOptions( [ option.name ] );
                                            history.push( GlobalService.states.products );
                                        })}>
                                        {option.name}
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='shr-header__desktop-right'>
                        {
                            ( !currentUser && showSignUp ) &&
                            <div className='shr-header__desktop-sign-up'>
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
                            <div className='shr-header__desktop-sign-in'>
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
                            <div className='shr-header__desktop-logged'>
                                <ShrButton
                                    fullWidth={true}
                                    variant={ButtonVariant.outlined}
                                    color={ButtonColor.primary}
                                    type={ButtonType.button}
                                    title={i18n.t( 'global.log-out' )}
                                    size={ButtonSize.small}
                                    action={( async (): Promise<void> => await logout() )} />
                                <IconButton
                                    className='shr-header__desktop-menu-profile'
                                    onClick={( (): void => history.push( GlobalService.states.userProfile ) )}
                                    color='primary'
                                    aria-label={i18n.t( 'shr-header.profile' )}
                                    title={i18n.t( 'shr-header.profile' )}
                                    component='span'>
                                    <AccountCircle />
                                </IconButton>
                                <IconButton
                                    className='shr-header__desktop-menu-favourites'
                                    onClick={( (): void => history.push( GlobalService.states.favourites ) )}
                                    color='primary'
                                    aria-label={i18n.t( 'shr-header.favourites' )}
                                    title={i18n.t( 'shr-header.favourites' )}
                                    component='span'>
                                    <FavoriteIcon />
                                </IconButton>
                                <div
                                    className='shr-header__desktop-basket'
                                    aria-label={i18n.t( 'shr-header.basket' )}
                                    title={i18n.t( 'shr-header.basket' )}
                                    onClick={( (): void => history.push( GlobalService.states.basket ) )}>
                                    <ShoppingBasket aria-label={i18n.t( 'shr-header.basket' )} />
                                    <span className='shr-header__desktop-basket-qty'>
                                        {
                                            productsToBuy.length > 0 ?
                                                basketQty : 0
                                        }
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
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
