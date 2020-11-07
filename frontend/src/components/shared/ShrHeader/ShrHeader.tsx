import React, { useState } from 'react';
import './ShrHeader.scss';
import { useHistory } from 'react-router-dom';
import i18n from '../../../i18n';

const ShrHeader: React.FC = () => {
    const history = useHistory();
    const [ showMenu, setShowMenu ] = useState( false );

    const options = [
        {
            url: 'mens',
            title: 'Men\'s'
        },
        {
            url: 'womens',
            title: 'Women\'s'
        },
        {
            url: 'black',
            title: 'Black'
        },
        {
            url: 'summer',
            title: 'Summer'
        },
        {
            url: 'outlet',
            title: 'Outlet'
        }
    ];

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
                        <span
                            className='shr-header__mobile-login'
                            onClick={ (): void => { alert( 'Login' );}}>
                            {i18n.t( 'global.login' )}
                        </span>
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
                    <div className='shr-header__mobile-option shr-header__mobile-active'>Home</div>
                    {options.map( ( option, key ) => {
                        return (
                            <div
                                key={key}
                                className='shr-header__mobile-option'
                                onClick={( (): void => history.push( option.url ) )}>
                                {option.title}
                            </div>
                        );
                    })}
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
                        {options.map( ( option, key ) => {
                            return (
                                <div
                                    key={key}
                                    className='shr-header__desktop-option'
                                    onClick={( (): void => history.push( option.url ) )}>
                                    {option.title}
                                </div>
                            );
                        })}
                    </div>
                    <span className='shr-header__desktop-login'>
                        {i18n.t( 'global.login' )}
                    </span>
                </div>
            </header>
        </div>
    );
};

export default ShrHeader;
