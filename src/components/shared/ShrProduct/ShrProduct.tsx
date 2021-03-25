import React, { useContext, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useHistory } from 'react-router-dom';
import i18n from '../../../i18n';
import { GlobalContext } from '../../../providers/Global/Global.provider';
import GlobalService from '../../../services/Global/Global.service';
import './ShrProduct.scss';
import { Product } from '../../../providers/Global/Global.model';
import NumberUtils from '../../../utils/numberUtils';
import imgLoading from '../../../assets/images/img-loading.jpg';

type ShrProductProps = {
    product: Product;
}

const ShrProduct: React.FC<ShrProductProps> = ({ product }) => {
    const history = useHistory();
    const { data: { favourites, currentUser }, updateFavouritesCollection } = useContext( GlobalContext );
    const [ loaded, setLoaded  ] = useState( false );

    const addFavouriteHandler = ( id: string ): void => {
        const prods = JSON.parse( JSON.stringify( favourites ) );

        prods.push( id );
        updateFavouritesCollection( prods );
    };

    const removeFavouriteHandler = ( id: string ): void => {
        const prods = favourites?.filter( ( prod: string ) => prod !== id );
        updateFavouritesCollection( prods );
    };

    return (
        <div
            className='shr-product'
            key={product.id}>
            <span
                className='shr-product__img-wrapper'
                onClick={(): void => history.push( `${GlobalService.states.addProduct}/${product.id}` ) }>
                <div className='shr-product__img-container'>
                    {
                        <img
                            onLoad={(): void => {setLoaded( true ); } }
                            className={loaded ?
                                'shr-product__img shr-product__img-principal' :
                                'shr-product__img shr-product__img-principal shr-product__img-hidden'}
                            src={product.imgUrl}
                            alt={product.title} />
                    }
                    {
                        <img
                            className={!loaded ? 'shr-product__img' : 'shr-product__img shr-product__img-hidden'}
                            src={imgLoading}
                            alt='Loading' />
                    }
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
                    {
                        !!currentUser ?
                            !!favourites?.filter( item => item.includes( product.id ) ).length ?
                                <div
                                    className='shr-product__heart shr-product__remove-favorite'
                                    onClick={(): void => removeFavouriteHandler( product.id )}>
                                    <FavoriteIcon />
                                </div> :
                                <div
                                    className='shr-product__heart shr-product__add-favorite'
                                    onClick={(): void => addFavouriteHandler( product.id )}>
                                    <FavoriteBorderIcon />
                                </div> :
                            <></>
                    }
                </div>
                <div>
                    {NumberUtils.getCurrency( Number( product.price ) ) }
                </div>
            </div>
        </div>
    );
};

export default ShrProduct;
