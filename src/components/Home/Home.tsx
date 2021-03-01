import React from 'react';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import MainHome from '../MainHome/MainHome';
import LatestNews from '../LatestNews/LatestNews';
import ShrHorizontalImage from '../shared/ShrHorizontalImage/ShrHorizontalImage';
import SendOptions from '../SendOptions/SendOptions';
import i18n from '../../i18n';

const Home = (): JSX.Element => {
    return (
        <ShrLayout>
            <div className='home'>
                <MainHome />
                <LatestNews />
                <ShrHorizontalImage
                    title={i18n.t( 'home.shr-horizontal-image.title' )}
                    description={i18n.t( 'home.shr-horizontal-image.description' )}
                    imgName={'medium_edit.png'}/>
                <SendOptions />
            </div>
        </ShrLayout>
    );
};

export default Home;
