import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../providers/Global/Global.model';
import './ProductItem.scss';

type ProductItemType = {
    product: Product;
}

const ProductItem: React.FC<ProductItemType> = ({ product: { imgUrl, title, description, price }}) => {
    return (
        <motion.section
            className='product-item'
            layout
            whileHover={{ opacity: 1 }}>
            <motion.img
                className='product-item__img'
                src={imgUrl}
                alt={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }} />
            <div className='product-item__body'>
                <h3 className='product-item__title'>
                    {title}
                </h3>
                <p className='product-item__description'>
                    {description}
                </p>
                <span className='product-item__price'>
                    ${price}
                </span>
            </div>
            <div className='product-item__bar' />
        </motion.section>
    );
};

export default ProductItem;
