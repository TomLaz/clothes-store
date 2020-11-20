// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import i18n, { TFunctionResult } from 'i18next';
import mockI18Next from './mocks/i18next.mock';

// We have to mock i18Next outside the main before each, because we have to mock
// the module itself before any test gets executed.
mockI18Next();

beforeEach( () => {

    // Skip our i18n system from init and mock the translate implementation to avoid
    // i18n processing on tests. That means, if a component uses i18n.t('some.key'),
    // our tests will receive [some.key] as final output. Which is easy to test.
    jest.spyOn( i18n, 't' ).mockImplementation( ( key: unknown ): TFunctionResult => {
        return `[${key}]`;
    });

    // Make sure we are making tests fail if errors or logs are generated.
    global.console.warn = ( message: string ): void => {
        throw message;
    };

    global.console.error = ( message: string ): void => {
        throw message;
    };
});
