import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

type ScrollToTopProps = {
    history: any;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ history, children }) => {
    useEffect( () => {
        const unlisten = history.listen( () => {
            window.scrollTo( 0, 0 );
        });
        return (): void => {
            unlisten();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default withRouter( ScrollToTop );
