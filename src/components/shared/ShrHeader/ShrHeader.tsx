import React, { useContext, useState } from 'react';
import './ShrHeader.scss';
import { useHistory } from 'react-router-dom';
import i18n from '../../../i18n';
import menuItems from './ShrHeader.items';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GlobalService from '../../../services/Global/Global.service';
import { GlobalContext } from '../../../providers/Global/Global.provider';
import { IconButton } from '@material-ui/core';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import useFirestore from '../../../firebase/useFirestore';

type ShrHeaderProps = {
    showSignIn?: boolean;
    showSignUp?: boolean;
}

const ShrHeader: React.FC<ShrHeaderProps> = ({ showSignIn, showSignUp }) => {
    const history = useHistory();
    const [ showMenu, setShowMenu ] = useState( false );
    const globalContext = useContext( GlobalContext );
    const basketProducts = useFirestore( 'basket' );

    return (
        <div className='shr-header'>
            <header className='shr-header__mobile'>
                <div className='shr-header__mobile-bar'>
                    <div
                        className='shr-header__mobile-brand'
                        onClick={(): void => history.push( '/' )}>
                        {i18n.t( 'global.brand' )}
                    </div>
                    <div className='shr-header__mobile-actions'>
                        {
                            globalContext.data.currentUser &&
                            <div
                                className='shr-header__mobile-basket'
                                aria-label={i18n.t( 'shr-header.basket' )}
                                title={i18n.t( 'shr-header.basket' )}
                                onClick={( (): void => history.push( GlobalService.states.basket ) )}>
                                <ShoppingBasket  />
                                <span className='shr-header__mobile-basket-qty'>
                                    {basketProducts.docs
                                        .map( item =>
                                            item.id === globalContext.data.currentUser.uid && item.products.length )}
                                </span>
                            </div>
                        }
                        <p
                            className='shr-header__mobile-burger'
                            onClick={ (): void => setShowMenu( !showMenu ) }>
                            <span></span>
                            <span></span>
                            <span></span>
                        </p>
                    </div>
                </div>
                <div className={
                    showMenu ? 'shr-header__mobile-menu shr-header__mobile-show' : 'shr-header__mobile-menu'}>
                    <div className='shr-header__mobile-sign'>
                        {
                            ( !globalContext.data.currentUser && showSignUp ) &&
                            <div className='shr-header__mobile-sign-up'>
                                <Button
                                    onClick={( (): void => history.push( GlobalService.states.signUp ) )}
                                    fullWidth={true}
                                    variant='outlined'
                                    color='primary'
                                    size='small'>
                                    {i18n.t( 'sign-up' )}
                                </Button>
                            </div>
                        }
                        {
                            ( !globalContext.data.currentUser && showSignIn ) &&
                            <div className='shr-header__mobile-sign-in'>
                                <Button
                                    onClick={( (): void => history.push( GlobalService.states.signIn ) )}
                                    fullWidth={true}
                                    variant='outlined'
                                    color='primary'
                                    size='small'>
                                    {i18n.t( 'sign-in' )}
                                </Button>
                            </div>
                        }
                        {
                            globalContext.data.currentUser &&
                            <div className='shr-header__mobile-log-out'>
                                <Button
                                    onClick={( async (): Promise<void> => await globalContext.logout() )}
                                    fullWidth={true}
                                    variant='outlined'
                                    color='primary'
                                    size='small'>
                                    {i18n.t( 'global.log-out' )}
                                </Button>
                            </div>
                        }
                        {
                            globalContext.data.currentUser &&
                            <div className='shr-header__mobile-user-profile'>
                                <Button
                                    onClick={( (): void => history.push( GlobalService.states.userProfile ) )}
                                    fullWidth={true}
                                    variant='outlined'
                                    color='primary'
                                    size='small'>
                                    {i18n.t( 'global.user-profile' )}
                                </Button>
                            </div>
                        }
                    </div>
                    <div className='shr-header__mobile-option shr-header__mobile-active'>Home</div>
                    {
                        globalContext.data.filters.length > 0 &&
                        globalContext.data.filters.map( ( option, key ) => {
                            return (
                                <div
                                    key={key}
                                    className='shr-header__mobile-option'
                                    onClick={( (): void => {
                                        console.log( 'entro al onclick' );
                                        globalContext.updateFilteredOptions( [ option.name ] );
                                        history.push( GlobalService.states.products );
                                    })}>
                                    {option.name}
                                </div>
                            );
                        })
                    }
                </div>
            </header>
            <header className='shr-header__desktop'>
                <div className='shr-header__desktop-info'>
                    <span className='shr-header__desktop-dev' onClick={(): void => history.push( '/' )}>
                        {i18n.t( 'global.brand' )}
                    </span>
                    <span className='shr-header__desktop-social'>
                        <i className='fab fa-facebook-square'></i>
                        <i className='fab fa-instagram-square'></i>
                        <i className='fab fa-twitter-square'></i>
                        <i className='fab fa-youtube-square'></i>
                    </span>
                </div>
                <div className='shr-header__desktop-actions'>
                    <div className='shr-header__desktop-options'>
                        {
                            globalContext.data.filters.length > 0 &&
                            globalContext.data.filters.map( ( option, key ) => {
                                return (
                                    <div
                                        key={key}
                                        className='shr-header__desktop-option'
                                        onClick={( (): void => {
                                            console.log( 'entro al onclick' );
                                            globalContext.updateFilteredOptions( [ option.name ] );
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
                            ( !globalContext.data.currentUser && showSignUp ) &&
                            <div className='shr-header__desktop-sign-up'>
                                <Button
                                    onClick={( (): void => history.push( GlobalService.states.signUp ) )}
                                    variant='outlined'
                                    color='primary'
                                    size='small'>
                                    {i18n.t( 'sign-up' )}
                                </Button>
                            </div>
                        }
                        {
                            ( !globalContext.data.currentUser && showSignIn ) &&
                            <div className='shr-header__desktop-sign-in'>
                                <Button
                                    onClick={( (): void => history.push( GlobalService.states.signIn ) )}
                                    variant='outlined'
                                    color='primary'
                                    size='small'>
                                    {i18n.t( 'sign-in' )}
                                </Button>
                            </div>
                        }
                        {
                            globalContext.data.currentUser &&
                            <div className='shr-header__desktop-logged'>
                                <Button
                                    onClick={( async (): Promise<void> => await globalContext.logout() )}
                                    variant='outlined'
                                    color='primary'
                                    aria-label={i18n.t( 'global.log-out' )}
                                    size='small'>
                                    {i18n.t( 'global.log-out' )}
                                </Button>
                                <IconButton
                                    onClick={( (): void => history.push( GlobalService.states.userProfile ) )}
                                    color='primary'
                                    aria-label={i18n.t( 'shr-header.profile' )}
                                    title={i18n.t( 'shr-header.profile' )}
                                    component='span'>
                                    <AccountCircle />
                                </IconButton>
                                <div
                                    className='shr-header__desktop-basket'
                                    aria-label={i18n.t( 'shr-header.basket' )}
                                    title={i18n.t( 'shr-header.basket' )}
                                    onClick={( (): void => history.push( GlobalService.states.basket ) )}>
                                    <ShoppingBasket aria-label={i18n.t( 'shr-header.basket' )} />
                                    <span className='shr-header__desktop-basket-qty'>
                                        {basketProducts.docs
                                            .map( item =>
                                                item.id === globalContext.data.currentUser.uid &&
                                                item.products.length )}
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </header>
            <div className='shr-header__span'></div>
        </div>
    );
};

ShrHeader.defaultProps = {
    showSignIn: true,
    showSignUp: true
};

export default ShrHeader;
