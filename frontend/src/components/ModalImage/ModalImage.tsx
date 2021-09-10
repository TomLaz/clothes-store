import React from 'react';
import './ModalImage.scss';
import { Dialog } from '@material-ui/core';

type ModalImageProps = {
    selectedImg: string;
    setSelectedImg: ( imgSelected: string | null ) => void;
    title: string;
}

const ModalImage: React.FC<ModalImageProps> = ({ selectedImg, setSelectedImg, title }) => {
    const onClickHandler = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ): void => {
        const element = e.target as Element;

        if ( element.classList.contains( 'MuiBackdrop-root' ) ||
        element.classList.contains( 'MuiDialog-container' ) ) {
            setSelectedImg( null );
        }
    };

    return (
        <Dialog
            onClick={onClickHandler}
            fullWidth
            maxWidth='xs'
            aria-labelledby={title}
            open={!!selectedImg}>
            <img
                className='modal-image__img'
                src={selectedImg}
                alt={title} />
        </Dialog>
    );
};

export default ModalImage;
