import React from 'react';
import './ShrSpinner.scss';
import { CircularProgress } from '@material-ui/core';

const ShrSpinner: React.FC = () => {
    return (
        <div className='shr-spinner'>
            <CircularProgress />
        </div>
    );
};

export default ShrSpinner;
