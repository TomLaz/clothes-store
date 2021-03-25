import React, { useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import i18n from '../../i18n';
import './ProductDetail.scss';
import NumberUtils from '../../utils/numberUtils';
import imgLoading from '../../assets/images/img-loading.jpg';

type ProductDetailProps = {
    imgUrl: string;
    imgAlt: string;
    title: string;
    color?: string;
    productDescription?: string;
    productSize?: string;
    productQty?: string;
    productUnitPrice?: string;
    productPrice: string;
    onRemoveProductHandler?: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = (
    { imgUrl, imgAlt, title, color, productDescription, productSize,
        productQty, productUnitPrice, productPrice, onRemoveProductHandler }
) => {
    const [ loaded, setLoaded  ] = useState( false );

    return (
        <div className='product-detail'>
            {
                <img
                    onLoad={(): void => {setLoaded( true ); } }
                    className={loaded ?
                        'product-detail__img product-detail__img-principal' :
                        'product-detail__img product-detail__img-principal product-detail__img-hidden'}
                    src={imgUrl}
                    alt={imgAlt} />
            }
            {
                <img
                    className={!loaded ? 'product-detail__img' : 'product-detail__img product-detail__img-hidden'}
                    src={imgLoading}
                    alt='Loading' />
            }
            <div className='product-detail__container'>
                <div className='product-detail__title'>
                    {title}
                </div>
                {
                    !!productDescription &&
                    <div className='product-detail__description'>
                        {i18n.t( 'product-detail.description', { description: productDescription })}
                    </div>
                }
                {
                    !!color &&
                    <div className='product-detail__color'>
                        {i18n.t( 'product-detail.color', { color: color })}
                    </div>
                }
                {
                    !!productSize &&
                    <div className='product-detail__size'>
                        {i18n.t( 'basket.product.size', { size: productSize })}
                    </div>
                }
                {
                    !!productQty &&
                    <div className='product-detail__qty'>
                        {i18n.t( 'basket.product.qty', { quantity: productQty })}
                    </div>
                }
                {
                    !!productUnitPrice &&
                    <div className='product-detail__unit-price'>
                        {i18n.t( 'basket.product.unit-price', { unitPrice: NumberUtils.getCurrency( Number( productUnitPrice ) ) })}
                    </div>
                }
                {
                    !!onRemoveProductHandler &&
                    <div
                        onClick={onRemoveProductHandler}
                        className='product-detail__svg'>
                        <DeleteForeverIcon />
                    </div>
                }
            </div>
            <div className='product-detail__price'>
                {NumberUtils.getCurrency( Number( productPrice ) )}
            </div>
        </div>
    );
};

export default ProductDetail;
