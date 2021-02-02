import React, { useContext, useEffect } from 'react';
import './LatestNews.scss';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom';
import useFirestore from '../../firebase/useFirestore';
import { GlobalContext } from '../../providers/Global/Global.provider';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import GlobalService from '../../services/Global/Global.service';

const LatestNews: React.FC = () => {
    const history = useHistory();
    const globalContext = useContext( GlobalContext );

    const addFavouriteHandler = ( id: string ): void => {
        try {
            const prods = !!globalContext.data.favourites.filter( item => item.id === globalContext.data.currentUser.uid ).length ?
                globalContext.data.favourites.filter( item => item.id === globalContext.data.currentUser.uid )[0].products : [];

            prods.push( id );
            globalContext.updateFavouritesCollection( globalContext.data.currentUser.uid, prods );
        } catch {}
    };

    const removeFavouriteHandler = ( id: string ): void => {
        try {
            const prods = globalContext.data.favourites
                .filter( item => item.id === globalContext.data.currentUser.uid )[0].products
                .filter( ( prod: string ) => prod !== id );
            globalContext.updateFavouritesCollection( globalContext.data.currentUser.uid, prods );
        } catch {}
    };

    // const addProductHandler = ( id: string ): void => {
    //     try {
    //         const prods = !!basketProducts.docs
    //             .filter( item => item.id === globalContext.data.currentUser.uid ).length ?
    //             basketProducts.docs.filter( item => item.id === globalContext.data.currentUser.uid )[0].products : [];

    //         prods.push( id );

    //         basketProducts.updateCollection( globalContext.data.currentUser.uid, prods );
    //     } catch {}
    // };

    // const removeProductHandler = ( id: string ): void => {
    //     try {
    //         const prods = basketProducts.docs
    //             .filter( item => item.id === globalContext.data.currentUser.uid )[0].products
    //             .filter( ( prod: string ) => prod !== id );

    //         basketProducts.updateCollection( globalContext.data.currentUser.uid, prods );
    //     } catch {}
    // };

    return (
        <section className='latest-news'>
            <h3 className='latest-news__title'>
                Latest News
            </h3>
            {
                !!globalContext.data.products.length &&
                <div className='latest-news__gallery'>
                    {
                        globalContext.data.products.slice( 0, 9 ).map( ( product ) => {
                            return (
                                <div className='latest-news__product' key={product.id}>
                                    <span
                                        className='latest-news__img-wrapper'
                                        onClick={(): void =>
                                            history.push( `${GlobalService.states.productDetail}/${product.id}` ) }>
                                        <div className='latest-news__img-container'>
                                            <img
                                                className='latest-news__img'
                                                src={product.imgUrl}
                                                alt={product.title} />
                                        </div>
                                        <div className='latest-news__info'>
                                            +Info
                                        </div>
                                    </span>
                                    <div className='latest-news__description'>
                                        <div className='latest-news__title-container'>
                                            <div className='latest-news__title-container'>
                                                {product.title}
                                            </div>
                                            {/* {!!globalContext.data.currentUser ?
                                                !!basketProducts.docs
                                                    .filter( item => item.id === globalContext.data.currentUser.uid )
                                                    .filter( data => data.products.includes( product.id ) ).length ?
                                                    <div
                                                        className='latest-news__check'
                                                        onClick={(): void => removeProductHandler( product.id )}>
                                                        <CheckIcon />
                                                    </div> :
                                                    <div
                                                        className='latest-news__add'
                                                        onClick={(): void => addProductHandler( product.id )}>
                                                        <AddIcon />
                                                    </div> :
                                                <></>
                                            } */}
                                            {!!globalContext.data.currentUser ?
                                                !!globalContext.data.favourites
                                                    .filter( item => item.id === globalContext.data.currentUser.uid )
                                                    .filter( data => data.products.includes( product.id ) ).length ?
                                                    <div
                                                        className='latest-news__heart'
                                                        onClick={(): void => removeFavouriteHandler( product.id )}>
                                                        <FavoriteIcon />
                                                    </div> :
                                                    <div
                                                        className='latest-news__heart'
                                                        onClick={(): void => addFavouriteHandler( product.id )}>
                                                        <FavoriteBorderIcon />
                                                    </div> :
                                                <></>
                                            }
                                        </div>
                                        <div>
                                            $ {product.price}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            }
        </section>
    );
};

export default LatestNews;
