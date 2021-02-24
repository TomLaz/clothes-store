import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './ProductDetail.scss';

type ProductDetailProps = {
    imgUrl: string;
    imgAlt: string;
    productDescription: string;
    productSize: string;
    productQty: string;
    productUnitPrice: string;
    productPrice: string;
    onRemoveProductHandler: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ( props ) => {
    return (
        <div className='product-detail'>
            <img
                className='product-detail__img'
                src={props.imgUrl}
                alt={props.imgAlt} />
            <div className='product-detail__container'>
                <div className='product-detail__description'>
                    {props.productDescription}
                </div>
                <div className='product-detail__size'>{props.productSize}</div>
                <div className='product-detail__qty'>{props.productQty}</div>
                <div className='product-detail__unit-price'>{props.productUnitPrice}</div>
                <div onClick={props.onRemoveProductHandler}>
                    <DeleteForeverIcon />
                </div>
            </div>
            <div className='product-detail__price'>
                ${props.productPrice}
            </div>
        </div>
    );
};

export default ProductDetail;
