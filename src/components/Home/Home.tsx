import React, { Suspense, lazy } from 'react';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import i18n from '../../i18n';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';

const MainHome = lazy( () => import( '../MainHome/MainHome' ) );
const LatestNews = lazy( () => import( '../LatestNews/LatestNews' ) );
const ShrHorizontalImage = lazy( () => import( '../shared/ShrHorizontalImage/ShrHorizontalImage' ) );
const SendOptions = lazy( () => import( '../SendOptions/SendOptions' ) );

const Home = (): JSX.Element => {
    return (
        <ShrLayout>
            <Suspense fallback={<ShrSpinner />}>
                <MainHome />
                <LatestNews />
                <ShrHorizontalImage
                    title={i18n.t( 'home.shr-horizontal-image.title' )}
                    description={i18n.t( 'home.shr-horizontal-image.description' )}
                    imgName={'medium_edit.png'}/>
                <SendOptions />
            </Suspense>
        </ShrLayout>
    );
};

export default Home;
