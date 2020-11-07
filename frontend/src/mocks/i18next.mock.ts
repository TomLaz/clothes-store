import { ReactNode } from 'react';

export default function mockI18Next(): void {
    // Mock the whole module to avoid any type of actual translation. In the case of the
    // Trans component, we add a custom implementation because we need to retreive its children
    // if we don't return them, we won't be able to test some usages.
    interface TransProps {
        children: ReactNode;
    }

    jest.mock( 'react-i18next', () => ({
        ...jest.requireActual( 'react-i18next' ),
        Trans: ( props: { children: React.FC<TransProps> }): React.FC<TransProps> => ( props.children )
    }) );
}
