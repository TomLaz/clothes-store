import React from 'react';
import { useHistory } from 'react-router-dom';
import i18n from '../../i18n';
import GlobalService from '../../services/Global/Global.service';
import ShrButton, { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../shared/ShrButton/ShrButton';
import './MainHome.scss';

const MainHome: React.FC = () => {
    const history = useHistory();

    return (
        <main className='main-home'>
            <div className="main-home__container">
                <h1 className="main-home__title">
                    {i18n.t( 'main-home.title' )}
                </h1>
                <p>
                    {i18n.t( 'main-home.description' )}
                </p>
                <div className='main-home__btn'>
                    <ShrButton
                        fullWidth={false}
                        variant={ButtonVariant.outlined}
                        color={ButtonColor.default}
                        type={ButtonType.button}
                        title={i18n.t( 'main-home.new-collection' )}
                        size={ButtonSize.large}
                        action={ (): void => history.push( GlobalService.states.products ) } />
                </div>
            </div>
        </main>
    );
};

export default MainHome;
