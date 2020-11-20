import React, { useState } from 'react';
import './ShrHeader.scss';
import { useHistory } from 'react-router-dom';
import i18n from '../../../i18n';
import menuItems from './ShrHeader.items';
import Button from '@material-ui/core/Button';
import GlobalService from '../../../services/Global/Global.service';

type ShrHeaderProps = {
    showSignIn?: boolean;
    showSignUp?: boolean;
}

const ShrHeader: React.FC<ShrHeaderProps> = ({ showSignIn, showSignUp }) => {
    const history = useHistory();
    const [ showMenu, setShowMenu ] = useState( false );

    return (
        <div className='shr-header'>
            <div className='shr-header__mobile'>
                <div className='shr-header__mobile-bar'>
                    <div
                        className='shr-header__mobile-brand'
                        onClick={(): void => history.push( '/' )}>
                        {i18n.t( 'global.brand' )}
                    </div>
                    <div className='shr-header__mobile-actions'>
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
                            showSignUp &&
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
                            showSignIn &&
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
                    </div>
                    <div className='shr-header__mobile-option shr-header__mobile-active'>Home</div>
                    {
                        menuItems &&
                        menuItems.map( ( option, key ) => {
                            return (
                                <div
                                    key={key}
                                    className='shr-header__mobile-option'
                                    onClick={( (): void => history.push( option.url ) )}>
                                    {option.title}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
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
                            menuItems &&
                            menuItems.map( ( option, key ) => {
                                return (
                                    <div
                                        key={key}
                                        className='shr-header__desktop-option'
                                        onClick={( (): void => history.push( option.url ) )}>
                                        {option.title}
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='shr-header__desktop-right'>
                        {
                            showSignUp &&
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
                            showSignIn &&
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
                    </div>
                </div>
            </header>
        </div>
    );
};

ShrHeader.defaultProps = {
    showSignIn: true,
    showSignUp: true
};

export default ShrHeader;
