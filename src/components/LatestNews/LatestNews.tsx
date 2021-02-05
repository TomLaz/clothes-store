import React, { useContext } from 'react';
import './LatestNews.scss';
import { GlobalContext } from '../../providers/Global/Global.provider';
import Product from '../Product/Product';

const LatestNews: React.FC = () => {
    const globalContext = useContext( GlobalContext );

    return (
        <section className='latest-news'>
            <h3 className='latest-news__title'>
                Latest News
            </h3>
            {
                !!globalContext.data.products.length &&
                <div className='latest-news__gallery'>
                    {
                        globalContext.data.products.slice( 0, 29 ).map( ( product ) => {
                            return (
                                <Product product={product} key={product.id} />
                            );
                        })
                    }
                </div>
            }
        </section>
    );
};

export default LatestNews;
