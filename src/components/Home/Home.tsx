import React from 'react';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import MainHome from '../MainHome/MainHome';
import LatestNews from '../LatestNews/LatestNews';
import ShrHorizontalImage from '../shared/ShrHorizontalImage/ShrHorizontalImage';
import SendOptions from '../SendOptions/SendOptions';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import i18n from '../../i18n';

const Home = (): JSX.Element => {

    return (
        <div className='home'>
            <ShrHeader />
            <MainHome />
            <LatestNews />
            <ShrHorizontalImage
                title={i18n.t( 'home.shr-horizontal-image.title' )}
                description={i18n.t( 'home.shr-horizontal-image.description' )}
                imgName={'medium_edit.png'}/>
            <SendOptions />
            <ShrFooter />
        </div>
    );
};

export default Home;
