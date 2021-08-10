/* global describe, it, expect, location */
import {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

import {NavigationProvider} from '../../../test-unit/util/navigation-provider';

import {useUrl} from './url-hook';
import {QueryValueType, UseUrlHookOptionsType} from './url-hook-type';

function useResetHookState<QueryMap>(
    pushState: (pathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void
) {
    useEffect(() => {
        return () => {
            pushState('/', {}, {isSaveQueries: false});
        };
    }, [pushState]);
}

describe('useUrl', () => {
    it('default state', () => {
        // eslint-disable-next-line react/no-multi-comp
        function DefaultState(): JSX.Element {
            const {pathname, queries} = useUrl<Record<string, string>>();

            expect(pathname).toEqual('/');
            expect(queries).toEqual({});

            return <div />;
        }

        render(<NavigationProvider component={DefaultState} />);
    });

    it('pushPathname', () => {
        // eslint-disable-next-line react/no-multi-comp
        function PushPathname(): JSX.Element {
            const {pushPathname, pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            useEffect(() => {
                pushPathname('/test-push-url');
            }, [pushPathname]);

            return <div />;
        }

        const {unmount} = render(<NavigationProvider component={PushPathname} />);

        expect(location.pathname).toEqual('/test-push-url');

        unmount();
    });

    it('pushPathname: save query', () => {
        // eslint-disable-next-line react/no-multi-comp
        function PushPathnameSaveQuery(): JSX.Element {
            const {setQuery, pushPathname, pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            useEffect(() => {
                setQuery({bar: '2', foo: '1'});
            }, [setQuery]);

            useEffect(() => {
                pushPathname('/test-push-url-save-query');
            }, [pushPathname]);

            return <div />;
        }

        const {unmount} = render(<NavigationProvider component={PushPathnameSaveQuery} />);

        expect(location.pathname).toEqual('/test-push-url-save-query');
        expect(location.search).toEqual('?bar=2&foo=1');

        unmount();
    });

    it('pushPathname: clean query', () => {
        // eslint-disable-next-line react/no-multi-comp
        function PushPathnameCleanQuery(): JSX.Element {
            const {setQuery, pushPathname, pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            useEffect(() => {
                setQuery({mike: '2', nick: '1'});
            }, [setQuery]);

            useEffect(() => {
                pushPathname('/test-push-url-clean-query', {isSaveQueries: false});
            }, [pushPathname]);

            return <div />;
        }

        const {unmount} = render(<NavigationProvider component={PushPathnameCleanQuery} />);

        expect(location.pathname).toEqual('/test-push-url-clean-query');
        expect(location.search).toEqual('');

        unmount();
    });

    it('pushState', () => {
        // eslint-disable-next-line react/no-multi-comp
        function PushPathnameCleanQuery(): JSX.Element {
            const {pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            useEffect(() => {
                pushState('/test-push-state', {mike: 'push-mike', nick: 'push-nick'});
            }, [pushState]);

            return <div />;
        }

        const {unmount} = render(<NavigationProvider component={PushPathnameCleanQuery} />);

        expect(location.pathname).toEqual('/test-push-state');

        expect(location.search).toEqual('?mike=push-mike&nick=push-nick');

        unmount();
    });

    it('setQuery', () => {
        // eslint-disable-next-line react/no-multi-comp
        function SetQuery(): JSX.Element {
            const {setQuery, pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            useEffect(() => {
                setQuery({mike: 'mike-query', nick: 'nick-query'});
            }, [setQuery]);

            return <div />;
        }

        const {unmount} = render(<NavigationProvider component={SetQuery} />);

        expect(location.pathname).toEqual('/');
        expect(location.search).toEqual('?mike=mike-query&nick=nick-query');

        unmount();
    });

    it('setQuery: save query', () => {
        // eslint-disable-next-line react/no-multi-comp
        function SetQuerySaveQueryPrepare(): JSX.Element {
            const {setQuery, pushState, queries, pathname} = useUrl<Record<string, number>>();

            useEffect(() => {
                setQuery({mike: 2, nick: 1});
            }, [setQuery, queries, pushState, pathname]);

            return <div />;
        }

        // eslint-disable-next-line react/no-multi-comp
        function SetQuerySaveQuery(): JSX.Element {
            const {setQuery, pushState, queries, pathname} = useUrl<Record<string, number>>();

            useResetHookState(pushState);

            useEffect(() => {
                setQuery({one: 1, two: 2});
            }, [setQuery, queries, pushState, pathname]);

            return <div />;
        }

        render(<NavigationProvider component={SetQuerySaveQueryPrepare} />);
        const {unmount} = render(<NavigationProvider component={SetQuerySaveQuery} />);

        expect(location.search).toEqual('?mike=2&nick=1&one=1&two=2');

        unmount();
    });

    it('setQuery: clean query', () => {
        // eslint-disable-next-line react/no-multi-comp
        function SetQueryCleanQueryPrepare(): JSX.Element {
            const {setQuery} = useUrl<Record<string, number>>();

            useEffect(() => {
                setQuery({mike: 2, nick: 1}, {isSaveQueries: false});
            }, [setQuery]);

            return <div />;
        }

        // eslint-disable-next-line react/no-multi-comp
        function SetQueryCleanQuery(): JSX.Element {
            const {setQuery, pushState} = useUrl<Record<string, number>>();

            useResetHookState(pushState);

            useEffect(() => {
                setQuery({mike: 2, nick: 1}, {isSaveQueries: false});
            }, [setQuery]);

            return <div />;
        }

        render(<NavigationProvider component={SetQueryCleanQueryPrepare} />);
        const {unmount} = render(<NavigationProvider component={SetQueryCleanQuery} />);

        expect(location.search).toEqual('?mike=2&nick=1');

        unmount();
    });

    it('setQuery: pass any parameters', () => {
        // eslint-disable-next-line react/no-multi-comp
        function SetQueryPassAnyParameters(): JSX.Element {
            const {setQuery, pushState} = useUrl<Record<string, QueryValueType>>();

            useResetHookState(pushState);

            useEffect(() => {
                // Date | string | number | boolean | null | void
                setQuery({
                    emptyList: [], // empty list - exclude
                    emptyString: '', // empty string - exclude
                    invalidDate: new Date('2020-123-123'), // invalid date - exclude
                    list: [
                        new Date(0), // valid date - include
                        new Date('2020-123-123'), // invalid date - exclude
                        '', // exclude
                        ' ', // exclude
                        'str', // include
                        0, // include
                        Number.NaN, // exclude
                        Number.POSITIVE_INFINITY, // exclude
                        1, // include
                        true, // include
                        false, // include
                        null, // exclude
                        // eslint-disable-next-line no-undefined
                        undefined, // exclude
                    ],
                    spaceOnlyString: '     ', // space only string - exclude
                    // eslint-disable-next-line no-undefined
                    wrongList: [undefined, null], // wrong list - exclude
                });
            }, [setQuery]);

            return <div />;
        }

        const {unmount} = render(<NavigationProvider component={SetQueryPassAnyParameters} />);

        expect(location.search).toEqual('?list=1970-01-01T00%3A00%3A00.000Z%2Cstr%2C1%2Ctrue%2Cfalse');

        unmount();
    });

    it('getQuery', () => {
        // eslint-disable-next-line react/no-multi-comp
        function GetQueryPrepare(): JSX.Element {
            const {setQuery} = useUrl<Record<string, string>>();

            useEffect(() => {
                setQuery({mike: 'bar', nick: 'foo'});
            }, [setQuery]);

            return <div />;
        }

        // eslint-disable-next-line react/no-multi-comp
        function GetQuery(): JSX.Element {
            const {getQuery, pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            const nickQuery = getQuery('nick');
            const mikeQuery = getQuery('mike');
            const nonExistsQuery = getQuery('non-exists-query');

            expect(nickQuery).toEqual('foo');
            expect(mikeQuery).toEqual('bar');
            expect(nonExistsQuery).toEqual(null);

            return <div />;
        }

        render(<NavigationProvider component={GetQueryPrepare} />);
        const {unmount} = render(<NavigationProvider component={GetQuery} />);

        unmount();
    });

    it('deleteQuery', () => {
        // eslint-disable-next-line react/no-multi-comp, sonarjs/no-identical-functions
        function DeleteQueryPrepare(): JSX.Element {
            const {setQuery} = useUrl<Record<string, string>>();

            useEffect(() => {
                setQuery({mike: 'bar', nick: 'foo'});
            }, [setQuery]);

            return <div />;
        }

        // eslint-disable-next-line react/no-multi-comp
        function DeleteQuery(): JSX.Element {
            const {pushState, deleteQuery} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            useEffect(() => {
                deleteQuery('mike');
            }, [deleteQuery]);

            return <div />;
        }

        render(<NavigationProvider component={DeleteQueryPrepare} />);
        const {unmount} = render(<NavigationProvider component={DeleteQuery} />);

        expect(location.search).toEqual('?nick=foo');

        unmount();
    });

    it('pathname and queries', () => {
        // eslint-disable-next-line react/no-multi-comp, sonarjs/no-identical-functions
        function PathnameAndQueriesPrepare(): JSX.Element {
            const {pushState} = useUrl<Record<string, string>>();

            useEffect(() => {
                pushState('/some-test-path', {mike: 'bar-query', nick: 'foo-query'});
            }, [pushState]);

            return <div />;
        }

        // eslint-disable-next-line react/no-multi-comp
        function PathnameAndQueries(): JSX.Element {
            const {pathname, queries, pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            expect(pathname).toEqual('/some-test-path');
            expect(queries).toEqual({mike: 'bar-query', nick: 'foo-query'});

            return <div />;
        }

        render(<NavigationProvider component={PathnameAndQueriesPrepare} />);
        const {unmount} = render(<NavigationProvider component={PathnameAndQueries} />);

        unmount();
    });

    it('navigate from page to page', () => {
        // eslint-disable-next-line react/no-multi-comp
        function FirstPage(): JSX.Element {
            const {pushPathname} = useUrl<Record<string, string>>();

            useEffect(() => {
                pushPathname('/second-page');
            }, [pushPathname]);

            return <p>First Page</p>;
        }

        // eslint-disable-next-line react/no-multi-comp
        function SecondPage(): JSX.Element {
            const {pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            return <p>Second Page</p>;
        }

        // eslint-disable-next-line react/no-multi-comp
        function TwoPageApp(): JSX.Element {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route component={FirstPage} exact path="/" />
                        <Route component={SecondPage} exact path="/second-page" />
                    </Switch>
                </BrowserRouter>
            );
        }

        const {unmount} = render(<TwoPageApp />);

        expect(screen.getByText('Second Page')).toBeInTheDocument();

        unmount();
    });

    it('replacePathname: clean query', () => {
        // eslint-disable-next-line react/no-multi-comp
        function PushPathnameCleanQuery(): JSX.Element {
            const {setQuery, pushState, replacePathname} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            useEffect(() => {
                setQuery({mike: '2', nick: '1'});
            }, [setQuery]);

            useEffect(() => {
                replacePathname('/replace-test-push-url-clean-query', {isSaveQueries: false});
            }, [replacePathname]);

            return <div />;
        }

        const {unmount} = render(<NavigationProvider component={PushPathnameCleanQuery} />);

        expect(location.pathname).toEqual('/replace-test-push-url-clean-query');
        expect(location.search).toEqual('');

        unmount();
    });

    it('replace pathname and queries', () => {
        // eslint-disable-next-line react/no-multi-comp, sonarjs/no-identical-functions
        function ReplacePathnameAndQueriesPrepare(): JSX.Element {
            const {replaceState} = useUrl<Record<string, string>>();

            useEffect(() => {
                replaceState('/replace-some-test-path', {mike: 'bar-query', nick: 'foo-query'});
            }, [replaceState]);

            return <div />;
        }

        // eslint-disable-next-line react/no-multi-comp
        function ReplacePathnameAndQueries(): JSX.Element {
            const {pathname, queries, pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            expect(pathname).toEqual('/replace-some-test-path');
            expect(queries).toEqual({mike: 'bar-query', nick: 'foo-query'});

            return <div />;
        }

        render(<NavigationProvider component={ReplacePathnameAndQueriesPrepare} />);
        const {unmount} = render(<NavigationProvider component={ReplacePathnameAndQueries} />);

        unmount();
    });

    it('replace url', () => {
        // eslint-disable-next-line react/no-multi-comp
        function ReplaceUrlFirstPage(): JSX.Element {
            const {replacePathname} = useUrl<Record<string, string>>();

            useEffect(() => {
                replacePathname('/replace-second-page');
            }, [replacePathname]);

            return <p>First Page - replace</p>;
        }

        // eslint-disable-next-line react/no-multi-comp
        function ReplaceUrlSecondPage(): JSX.Element {
            const {pushState} = useUrl<Record<string, string>>();

            useResetHookState(pushState);

            return <p>Second Page - replace</p>;
        }

        // eslint-disable-next-line react/no-multi-comp
        function TwoPageApp(): JSX.Element {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route component={ReplaceUrlFirstPage} exact path="/" />
                        <Route component={ReplaceUrlSecondPage} exact path="/replace-second-page" />
                    </Switch>
                </BrowserRouter>
            );
        }

        const {unmount} = render(<TwoPageApp />);

        expect(screen.getByText('Second Page - replace')).toBeInTheDocument();

        unmount();
    });
});
