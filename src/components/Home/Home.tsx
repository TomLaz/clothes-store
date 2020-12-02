import React from 'react';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import MainHome from '../MainHome/MainHome';
import LatestNews from '../LatestNews/LatestNews';
import OutletPresentation from '../OutletPresentation/OutletPresentation';
import SendOptions from '../SendOptions/SendOptions';
import ShrFooter from '../shared/ShrFooter/ShrFooter';

const Home = (): JSX.Element => {

    return (
        <div className='home'>
            <ShrHeader />
            <MainHome />
            <LatestNews />
            <OutletPresentation />
            <SendOptions />
            <ShrFooter />
        </div>
    );
};

export default Home;
