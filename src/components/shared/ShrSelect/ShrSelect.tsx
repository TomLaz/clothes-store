import React from 'react';
import './ShrSelect.scss';

type ShrSelectProps = {
    title: string;
    selected: any;
    onOptionChange: any;
    options: any[];
}

const ShrSelect: React.FC<ShrSelectProps> = ( props ) => {
    return (
        <div className='shr-select'>
            <p className='shr-select__title'>{props.title}</p>
            <select value={props.selected} className='shr-select__select' onChange={ props.onOptionChange }>
                {
                    props.options.map( ( option, index ) => (
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
