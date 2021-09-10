import React, { useContext } from 'react';
import { GlobalContext } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';
import { IconButton } from '@material-ui/core';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ShrButton, { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../shared/ShrButton/ShrButton';
import i18n from '../../i18n';
import './DesktopHeader.scss';
import { useHistory } from 'react-router-dom';
import { BasketProductI } from '../../models/Global.model';

type DesktopHeaderProps = {
    showSignIn?: boolean;
    showSignUp?: boolean;
    showCategories?: boolean;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ showSignIn, showSignUp, showCategories }) => {
    const history = useHistory();
    const { data: { email, filters, basket }, updateFilteredOptions, updateCheckedFilters,
        updateFilteredProducts, updateActiveMenuItem, noUserLogged } = useContext( GlobalContext );

    const basketQty = ( !!basket && basket.products.length > 0 ) ?
        basket.products.map( ( prod: BasketProductI ) => Number( prod.quantity ) )
            .reduce( ( a: number, b: number ) => a + b, 0 ) : 0;

    const redirectTo = ( activeMenu: string, url: string ): void => {
        updateActiveMenuItem( activeMenu );
        history.push( url );
    };

    /* Logout function */
    const logout = (): void => {
        /* Clear User */
        noUserLogged();
        /* Redirect to Login Page */
        history.push( GlobalService.states.signIn );
    };

    return (
        <div className='desktop-header'>
            <div className='desktop-header__info'>
                <span
                    className='desktop-header__dev'
                    onClick={(): void => redirectTo( 'home', GlobalService.states.home )}>
                    {i18n.t( 'global.brand' )}
                </span>
                <span className='desktop-header__social'>
                    <FacebookIcon className='desktop-header__facebook' />
                    <InstagramIcon className='desktop-header__instagram' />
                    <TwitterIcon className='desktop-header__twitter' />
                    <YouTubeIcon className='desktop-header__youtube' />
                </span>
            </div>
            <div className='desktop-header__actions'>
                <div className='desktop-header__options'>
                    {
                        filters.length > 0 &&
                        showCategories &&
                        filters.map( ( option, key ) => {
                            return (
                                <div
                                    key={key}
                                    className='desktop-header__option'
                                    onClick={( (): void => {
                                        updateCheckedFilters({});
                                        updateFilteredProducts( [] );
                                        updateFilteredOptions( [ option.name ] );
                                        redirectTo( 'products', GlobalService.states.products );
                                    })}>
                                    {option.name}
                                </div>
                            );
                        })
                    }
                </div>
                <div className='desktop-header__right'>
                    {
                        ( !email && showSignUp ) &&
                        <div className='desktop-header__sign-up'>
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
                        ( !email && showSignIn ) &&
                        <div className='desktop-header__sign-in'>
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
                        email &&
                        <div className='desktop-header__logged'>
                            <ShrButton
                                fullWidth={true}
                                variant={ButtonVariant.outlined}
                                color={ButtonColor.primary}
                                type={ButtonType.button}
                                title={i18n.t( 'global.log-out' )}
                                size={ButtonSize.small}
                                action={logout} />
                            <IconButton
                                className='desktop-header__menu-profile'
                                onClick={( (): void => history.push( GlobalService.states.userProfile ) )}
                                color='primary'
                                aria-label={i18n.t( 'shr-header.profile' )}
                                title={i18n.t( 'shr-header.profile' )}
                                component='span'>
                                <AccountCircle />
                            </IconButton>
                            <IconButton
                                className='desktop-header__menu-favourites'
                                onClick={( (): void => history.push( GlobalService.states.favourites ) )}
                                color='primary'
                                aria-label={i18n.t( 'shr-header.favourites' )}
                                title={i18n.t( 'shr-header.favourites' )}
                                component='span'>
                                <FavoriteIcon />
                            </IconButton>
                            <div
                                className='desktop-header__basket'
                                aria-label={i18n.t( 'global.basket' )}
                                title={i18n.t( 'global.basket' )}
                                onClick={( (): void => history.push( GlobalService.states.basket ) )}>
                                <ShoppingBasket aria-label={i18n.t( 'global.basket' )} />
                                <span className='desktop-header__basket-qty'>
                                    {
                                        ( !!basket && basket.products.length > 0 ) ?
                                            basketQty : 0
                                    }
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

DesktopHeader.defaultProps = {
    showSignIn: true,
    showSignUp: true,
    showCategories: true
};

export default DesktopHeader;
