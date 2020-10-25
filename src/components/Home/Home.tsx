import React from 'react';
import './Home.scss';
import i18n from '../../i18n';
import ShrHeader from '../shared/ShrHeader/ShrHeader';

const Home = (): JSX.Element => {
    return (
        <div className='home'>
            <ShrHeader />
            {i18n.t( 'home.title' )}
        </div>
    );
};

export default Home;
