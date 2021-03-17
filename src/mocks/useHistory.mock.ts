import routeData from 'react-router';
import { UnregisterCallback, Href } from 'history';

export interface UseHistoryMock {
    push: jest.Mock;
    replace: jest.Mock;
    go: jest.Mock;
    goBack: jest.Mock;
    goForward: jest.Mock;
}

export function mockUseHistory(): UseHistoryMock {
    const mocks = {
        push: jest.fn(),
        replace: jest.fn(),
        go: jest.fn(),
        goBack: jest.fn(),
        goForward: jest.fn()
    };

    const location = {
        hash: '',
        key: '',
        pathname: '',
        search: '',
        state: {}
    };

    jest.spyOn( routeData, 'useHistory' ).mockReturnValue({
        length: 2,
        action: 'POP',
        location,
        push: mocks.push,
        replace: mocks.replace,
        go: mocks.go,
        goBack: mocks.goBack,
        goForward: mocks.goForward,
        block: (): UnregisterCallback => jest.fn(),
        createHref: () => {
            const temp: Href = '';
            return temp;
        },
        listen: (): UnregisterCallback => jest.fn()
    });

    return mocks;
}
