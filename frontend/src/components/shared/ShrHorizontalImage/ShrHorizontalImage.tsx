import React from 'react';
import './ShrHorizontalImage.scss';

type ShrHorizontalImageProps = {
    title: string;
    description: string;
    imgName: string;
}

const ShrHorizontalImage: React.FC<ShrHorizontalImageProps> = ({ title, description, imgName }) => {
    return (
        <section className='shr-horizontal-image'>
            <div
                className='shr-horizontal-image__wrapper'
                style={{ backgroundImage: `url(${require( '../../../assets/images/' + imgName )})` }}>
                <div className='shr-horizontal-image__container'>
                    <h3 className='shr-horizontal-image__title'>
                        {title}
                    </h3>
                    <p className='shr-horizontal-image__description'>
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ShrHorizontalImage;
