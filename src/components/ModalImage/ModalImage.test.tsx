import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalImage from './ModalImage';

describe( 'ModalImage', () => {
    let wrapper: RenderResult;

    const modalImageProps = {
        selectedImg: 'selectedImage',
        setSelectedImg: jest.fn(),
        title: 'title'
    };

    const getRender = (): RenderResult => {
        return render( <ModalImage {...modalImageProps} /> );
    };

    beforeEach( () => {
        wrapper = getRender();
    });

    afterEach( () => {
        cleanup();
    });

    test( 'should render without error', () => {
        const component = wrapper.baseElement.querySelector( '.backdrop' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call setSelectedImg on backdrop clicked', () => {
        const button = wrapper.baseElement.querySelector( '.backdrop' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click( button );
        }

        expect( modalImageProps.setSelectedImg ).toHaveBeenCalled();
    });

    test( 'should not call setSelectedImg on image clicked', () => {
        const imageWrapper = wrapper.baseElement.querySelector( '.backdrop__image' );
        expect( imageWrapper ).toBeInTheDocument();
        if ( imageWrapper ) {
            fireEvent.click( imageWrapper );
        }

        expect( modalImageProps.setSelectedImg ).not.toHaveBeenCalled();
    });
});
