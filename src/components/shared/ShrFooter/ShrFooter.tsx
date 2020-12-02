import React from 'react';
import './ShrFooter.scss';
import i18n from '../../../i18n';

const ShrFooter: React.FC = () => {
    return (
        <div className='shr-footer'>
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
                    <div className='shr-footer__category'>
                        {i18n.t( 'global.categories.mens' )}
                    </div>
                    <div className='shr-footer__category'>
                        {i18n.t( 'global.categories.women' )}
                    </div>
                    <div className='shr-footer__category'>
                        {i18n.t( 'global.categories.summer' )}
                    </div>
                    <div className='shr-footer__category'>
                        {i18n.t( 'global.categories.outlet' )}
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
                        <i className='fab fa-facebook shr-footer__icon'></i>
                        <i className='fab fa-instagram shr-footer__icon'></i>
                        <i className='fab fa-twitter shr-footer__icon'></i>
                        <i className='fab fa-youtube shr-footer__icon'></i>
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
        </div>
    );
};

export default ShrFooter;
