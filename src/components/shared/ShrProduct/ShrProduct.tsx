import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../../providers/Global/Global.provider';
import GlobalService from '../../../services/Global/Global.service';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './ShrProduct.scss';
import i18n from '../../../i18n';

type ShrProductProps = {
    product: any;
}

const ShrProduct: React.FC<ShrProductProps> = ({ product }) => {
    const history = useHistory();
    const { data: { favourites, currentUser }, updateFavouritesCollection } = useContext( GlobalContext );

    const addFavouriteHandler = ( id: string ): void => {
        try {
            const prods = !!favourites.filter( item => item.id === currentUser.uid ).length ?
                favourites.filter( item => item.id === currentUser.uid )[0].products : [];

            prods.push( id );
            updateFavouritesCollection( currentUser.uid, prods );
        } catch {}
    };

    const removeFavouriteHandler = ( id: string ): void => {
        try {
            const prods = favourites
                .filter( item => item.id === currentUser.uid )[0].products
                .filter( ( prod: string ) => prod !== id );
            updateFavouritesCollection( currentUser.uid, prods );
        } catch {}
    };

    return (
        <div
            className='shr-product'
            key={product.id}>
            <span
                className='shr-product__img-wrapper'
                onClick={(): void =>
                    history.push( `${GlobalService.states.addProduct}/${product.id}` ) }>
                <div className='shr-product__img-container'>
                    <img
                        className='shr-product__img'
                        src={product.imgUrl}
                        alt={product.title} />
                </div>
                <div className='shr-product__info'>
                    {i18n.t( 'shr-product.info' )}
                </div>
            </span>
            <div className='shr-product__description'>
                <div className='shr-product__title-container'>
                    <div className='shr-product__title-container'>
                        {product.title}
                    </div>
                    {!!currentUser ?
                        !!favourites
                            .filter( item => item.id === currentUser.uid )
                            .filter( data => data.products.includes( product.id ) ).length ?
                            <div
                                className='shr-product__heart'
                                onClick={(): void => removeFavouriteHandler( product.id )}>
                                <FavoriteIcon />
                            </div> :
                            <div
                                className='shr-product__heart'
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

export default ShrProduct;
