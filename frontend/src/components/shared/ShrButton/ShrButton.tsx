import React from 'react';
import { Button } from '@material-ui/core';
import './ShrButton.scss';

export enum ButtonSize {
    small = 'small',
    medium = 'medium',
    large = 'large'
}

export enum ButtonVariant {
    contained = 'contained',
    outlined = 'outlined',
    text = 'text'
}

export enum ButtonType {
    button = 'button',
    submit = 'submit'
}

export enum ButtonColor {
    default = 'default',
    inherit = 'inherit',
    primary = 'primary',
    secondary = 'secondary'
}

type ShrButtonProps = {
    fullWidth: boolean;
    variant: ButtonVariant;
    color: ButtonColor;
    disabled?: boolean;
    type: ButtonType;
    title: string;
    size: ButtonSize;
    action?: () => void;
}

const ShrButton: React.FC<ShrButtonProps> = ({ fullWidth, variant, color, disabled, type, title, size, action }) => {
    return (
        <div className='shr-button'>
            {
                type === ButtonType.button &&
                <Button
                    onClick={action}
                    fullWidth={fullWidth}
                    variant={variant}
                    disabled={disabled}
                    color={color}
                    component='span'
                    size={size}>
                    {title}
                </Button>
            }
            {
                type === ButtonType.submit &&
                <Button
                    onClick={action}
                    fullWidth={fullWidth}
                    variant={variant}
                    disabled={disabled}
                    color={color}
                    type='submit'
                    size={size}>
                    {title}
                </Button>
            }
        </div>
    );
};

ShrButton.defaultProps = {
    disabled: false
};

export default ShrButton;
