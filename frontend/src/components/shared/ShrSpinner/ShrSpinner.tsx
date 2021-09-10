import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './ShrSpinner.scss';

const ShrSpinner: React.FC = () => {
    return (
        <div className='shr-spinner'>
            <CircularProgress />
        </div>
    );
};

export default ShrSpinner;
