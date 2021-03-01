import React from 'react';
import './ShrSelect.scss';

type ShrSelectProps = {
    title: string;
    selected: string;
    onOptionChange: ( event: React.ChangeEvent<HTMLSelectElement> ) => void;
    options: string[];
}

const ShrSelect: React.FC<ShrSelectProps> = ({ title, selected, onOptionChange, options }) => {
    return (
        <div className='shr-select'>
            <p className='shr-select__title'>
                {title}
            </p>
            <select
                value={selected}
                className='shr-select__select'
                onChange={ onOptionChange }>
                {
                    options.map( ( option, index ) => (
                        <option
                            className='shr-select__option'
                            key={index}
                            value={option}>
                            {option}
                        </option>
                    ) )
                }
            </select>
        </div>
    );
};

export default ShrSelect;
