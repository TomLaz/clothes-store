import React, { useContext } from 'react';
import './LatestNews.scss';
import { GlobalContext } from '../../providers/Global/Global.provider';
import ShrProduct from '../shared/ShrProduct/ShrProduct';
import i18n from '../../i18n';

const LatestNews: React.FC = () => {
    const globalContext = useContext( GlobalContext );

    return (
        <section className='latest-news'>
            <h3 className='latest-news__title'>
                {i18n.t( 'latest-news.title' )}
            </h3>
            {
                !!globalContext.data.products.length &&
                <div className='latest-news__gallery'>
                    {
                        globalContext.data.products.slice( 0, 29 ).map( ( product ) => {
                            return (
                                <ShrProduct product={product} key={product.id} />
                            );
                        })
                    }
                </div>
            }
        </section>
    );
};

export default LatestNews;
