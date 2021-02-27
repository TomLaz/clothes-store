import React from 'react';
import './SendOptions.scss';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import StorefrontIcon from '@material-ui/icons/Storefront';
import i18n from '../../i18n';

const SendOptions: React.FC = () => {
    return (
        <section className='send-options'>
            <div className='send-options__option send-options__pay-options'>
                <CreditCardIcon className='send-options__icon' />
                <p className='send-options__description'>
                    {i18n.t( 'send-options.pay-options' )}
                </p>
                <div className='send-options__bar' />
            </div>
            <div className='send-options__option send-options__send-types'>
                <LocalShippingIcon className='send-options__icon' />
                <p className='send-options__description'>
                    {i18n.t( 'send-options.send-types' )}
                </p>
                <div className='send-options__bar' />
            </div>
            <div className='send-options__option send-options__exchange'>
                <AutorenewIcon className='send-options__icon' />
                <p className='send-options__description'>
                    {i18n.t( 'send-options.exchange' )}
                </p>
                <div className='send-options__bar' />
            </div>
            <div className='send-options__option send-options__store'>
                <StorefrontIcon className='send-options__icon' />
                <p className='send-options__description'>
                    {i18n.t( 'send-options.store' )}
                </p>
            </div>
        </section>
    );
};

export default SendOptions;
