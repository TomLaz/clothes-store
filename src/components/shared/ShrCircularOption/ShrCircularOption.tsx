import React from 'react';
import './ShrCircularOption.scss';

type ShrCircularOptionProps = {
    size: string;
    sizeSelected: string;
    onOptionSelected: () => void;
}

const ShrCircularOption: React.FC<ShrCircularOptionProps> = ({ size, sizeSelected, onOptionSelected }) => {
    return (
        <div
            className={size === sizeSelected ?
                'shr-circular-option__option shr-circular-option__active' :
                'shr-circular-option__option'}
            onClick={onOptionSelected}>
            <input
                type='radio'
                name='size'
                value={size}/>
            <span>{size}</span>
        </div>
    );
};

export default ShrCircularOption;
