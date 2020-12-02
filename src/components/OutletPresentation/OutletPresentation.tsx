import React from 'react';
import './OutletPresentation.scss';

const OutletPresentation: React.FC = () => {
    return (
        <section className='outlet-presentation'>
            <div className='outlet-presentation__wrapper'>
                <div className='outlet-presentation__container'>
                    <h3 className='outlet-presentation__title'>Outlet</h3>
                    <p className='outlet-presentation__description'>Las mejores marcas con los mejores descuentos</p>
                </div>
            </div>
        </section>
    );
};

export default OutletPresentation;
