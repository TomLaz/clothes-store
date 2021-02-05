import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Product.scss';

type ProductProps = {
    product: any;
}

const Product: React.FC<ProductProps> = ({ product }) => {
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

    return (
        <div className='product' key={product.id}>
            <span
                className='product__img-wrapper'
                onClick={(): void =>
                    history.push( `${GlobalService.states.productDetail}/${product.id}` ) }>
                <div className='product__img-container'>
                    <img
                        className='product__img'
                        src={product.imgUrl}
                        alt={product.title} />
                </div>
                <div className='product__info'>
                    +Info
                </div>
            </span>
            <div className='product__description'>
                <div className='product__title-container'>
                    <div className='product__title-container'>
                        {product.title}
                    </div>
                    {!!globalContext.data.currentUser ?
                        !!globalContext.data.favourites
                            .filter( item => item.id === globalContext.data.currentUser.uid )
                            .filter( data => data.products.includes( product.id ) ).length ?
                            <div
                                className='product__heart'
                                onClick={(): void => removeFavouriteHandler( product.id )}>
                                <FavoriteIcon />
                            </div> :
                            <div
                                className='product__heart'
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
};

export default Product;
