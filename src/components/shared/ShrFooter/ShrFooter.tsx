import React, { useContext } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useHistory } from 'react-router-dom';
import i18n from '../../../i18n';
import { GlobalContext } from '../../../providers/Global/Global.provider';
import GlobalService from '../../../services/Global/Global.service';
import './ShrFooter.scss';

const ShrFooter: React.FC = () => {
    const history = useHistory();
    const { data: { checkedFilters }, updateActiveMenuItem, updateCheckedFilters } = useContext( GlobalContext );

    return (
        <footer className='shr-footer'>
            <div className='shr-footer__box'>
                <div className='shr-footer__address'>
                    <div className='shr-footer__brand'>
                        {i18n.t( 'global.brand' )}
                    </div>
                    <div className='shr-footer__street'>
                        {i18n.t( 'brand.street' )}
                    </div>
                    <div className='shr-footer__state'>
                        {i18n.t( 'brand.state' )}
                    </div>
                </div>
                <div className='shr-footer__categories'>
                    <div className='shr-footer__category-title'>
                        {i18n.t( 'shr-footer.categories' )}
                    </div>
                    <div
                        className='shr-footer__category'
                        onClick={( (): void => {
                            updateActiveMenuItem( 'home' );
                            history.push( GlobalService.states.home );
                        })}>
                        {i18n.t( 'global.home' )}
                    </div>
                    <div
                        className='shr-footer__category'
                        onClick={( (): void => {
                            updateActiveMenuItem( 'favourites' );
                            history.push( GlobalService.states.favourites );
                        })}>
                        {i18n.t( 'shr-footer.favourites' )}
                    </div>
                    <div
                        className='shr-footer__category'
                        onClick={( (): void => {
                            updateActiveMenuItem( 'products' );
                            const copyCheckedFilters = JSON.parse( JSON.stringify( checkedFilters ) );
                            Object.keys( copyCheckedFilters ).forEach( itemName => {
                                copyCheckedFilters[ itemName ] = false;
                            });
                            updateCheckedFilters( copyCheckedFilters );

                            history.push( GlobalService.states.products );
                        })}>
                        {i18n.t( 'products.title' )}
                    </div>
                </div>
                <div className='shr-footer__about-us'>
                    <div className='shr-footer__about-title'>
                        {i18n.t( 'shr-footer.about-us' )}
                    </div>
                    <div className='shr-footer__category'>
                        {i18n.t( 'shr-footer.email' )}
                    </div>
                    <div className='shr-footer__category'>
                        {i18n.t( 'shr-footer.our-stores' )}
                    </div>
                    <div className='shr-footer__category'>
                        {i18n.t( 'shr-footer.contact-us' )}
                    </div>
                </div>
                <div className='shr-footer__social'>
                    <div className='shr-footer__social-title'>
                        {i18n.t( 'shr-footer.social-media' )}
                    </div>
                    <div className='shr-footer__social-media'>
                        <FacebookIcon className='shr-footer__icon' />
                        <InstagramIcon className='shr-footer__icon' />
                        <TwitterIcon className='shr-footer__icon' />
                        <YouTubeIcon className='shr-footer__icon' />
                    </div>
                </div>
                <div className='shr-footer__subscribe'>
                    <div className='shr-footer__subscribe-container'>
                        <div className='shr-footer__subscribe-body'>
                            <input
                                className='shr-footer__subscribe-input'
                                placeholder={i18n.t( 'shr-footer.insert-email' )} />
                        </div>
                        <div className='shr-footer__subscribe-submit'>
                            {i18n.t( 'shr-footer.subscribe' )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='shr-footer__copyright'>
                {i18n.t( 'shr-footer.copyright' )}
            </div>
        </footer>
    );
};

export default ShrFooter;
