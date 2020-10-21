import React from 'react';
import i18n from '../../i18n';
import './Home.scss';

const Home = (): JSX.Element => {
    return (
        <div className='home'>
            {i18n.t( 'home.title' )}
        </div>
    );
};

export default Home;
