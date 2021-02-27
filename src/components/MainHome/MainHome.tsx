import React from 'react';
import './MainHome.scss';
import i18n from '../../i18n';
import GlobalService from '../../services/Global/Global.service';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ShrButton, { ButtonSize, ButtonVariant, ButtonType, ButtonColor } from '../shared/ShrButton/ShrButton';

const MainHome: React.FC = () => {
    const history = useHistory();

    return (
        <div className='main-home'>
            <div className="main-home__container">
                <h1 className="main-home__title">
                    {i18n.t( 'main-home.title' )}
                </h1>
                <p>
                    {i18n.t( 'main-home.description' )}
                </p>
                <div className='main-home__btn'>
                    {/* <Button
                        onClick={ (): void => history.push( GlobalService.states.products ) }
                        variant='outlined'
                        color='primary'
                        size='large'>
                        {i18n.t( 'main-home.new-collection' )}
                    </Button> */}
                    <ShrButton
                        fullWidth={false}
                        variant={ButtonVariant.outlined}
                        color={ButtonColor.default}
                        type={ButtonType.button}
                        title={i18n.t( 'user-profile.upload-product' )}
                        size={ButtonSize.large}
                        action={ (): void => history.push( GlobalService.states.products ) } />
                </div>
            </div>
        </div>
    );
};

export default MainHome;
