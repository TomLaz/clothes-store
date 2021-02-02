import React from 'react';
import './ShrCircularOption.scss';

type ShrCircularOptionProps = {
    size: string;
    sizeSelected: string;
    onOptionSelected: any;
}

const ShrCircularOption: React.FC<ShrCircularOptionProps> = ( props ) => {
    return (
        <div
            className={props.size === props.sizeSelected ?
                'shr-circular-option__option shr-circular-option__active' :
                'shr-circular-option__option'}
            onClick={props.onOptionSelected}>
            {/* <input type="radio" name="size" stock={item.stock} value={item.size}/> */}
            <input type='radio' name='size' value={props.size}/>
            <span>{props.size}</span>
        </div>
    );
};

export default ShrCircularOption;
