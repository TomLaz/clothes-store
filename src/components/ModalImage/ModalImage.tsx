import React from 'react';
import './ModalImage.scss';
import { motion } from 'framer-motion';

type ModalImageProps = {
    selectedImg: string;
    setSelectedImg: any;
    title: string;
}

const ModalImage: React.FC<ModalImageProps> = ({ selectedImg, setSelectedImg, title }) => {
    const onClickHandler = ( e: any ): void => {
        if ( e.target.classList.contains( 'backdrop' ) ) {
            setSelectedImg( null );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='backdrop'
            onClick={onClickHandler}>
            <motion.img
                initial={{ y: '-100vh' }}
                animate={{ y: '0' }}
                src={selectedImg}
                alt={title} />
        </motion.div>
    );
};

export default ModalImage;