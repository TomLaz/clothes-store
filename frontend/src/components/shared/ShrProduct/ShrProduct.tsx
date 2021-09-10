import React, { useContext, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useHistory } from 'react-router-dom';
import imgLoading from '../../../assets/images/img-loading.jpg';
import i18n from '../../../i18n';
import { ProductI } from '../../../models/Global.model';
import { GlobalContext } from '../../../providers/Global/Global.provider';
import GlobalService from '../../../services/Global/Global.service';
import NumberUtils from '../../../utils/numberUtils';
import './ShrProduct.scss';

type ShrProductProps = {
    product: ProductI;
}

const ShrProduct: React.FC<ShrProductProps> = ({ product }) => {
    const history = useHistory();
    const { data: { jwt, favourites, email }, updateFavourites } = useContext( GlobalContext );
    const [ loaded, setLoaded  ] = useState( false );

    const addFavouriteHandler = ( productId: string ): void => {
        const favs = JSON.parse( JSON.stringify( favourites ) );

        favs.products.push( productId );
        updateFavourites( favs );
        GlobalService.updateFavourites( jwt || '', favs );
    };

    const removeFavouriteHandler = ( id: string ): void => {
        const favs = JSON.parse( JSON.stringify( favourites ) );
        const productsFiltered = favs.products.filter( ( prod: string ) => prod !== id );
        favs.products = productsFiltered;

        updateFavourites( favs );
        GlobalService.updateFavourites( jwt || '', favs );
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
                        !!email ?
                            !!favourites?.products.filter( item => item.includes( product.id ) ).length ?
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
