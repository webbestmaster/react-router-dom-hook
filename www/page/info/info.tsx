/* global setTimeout */

import {useEffect, useState} from 'react';

import {NavigationLink} from '../../library/src/navigation-link';
import {appRoute} from '../../component/app/app-route';
import {useUrl} from '../../library/library';

export function Info(): JSX.Element {
    const {replaceState, replacePathname} = useUrl();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log('info');
    });

    setTimeout(() => {
        console.log(isOpen);
        setIsOpen(false);
    }, 1e3);

    console.log('evaluate info');

    return (
        <div>
            <h1>info page</h1>

            <NavigationLink to={appRoute.root.path}>to home</NavigationLink>

            <button onClick={() => replacePathname('/home')} type="button">
                replace pathname
            </button>
            <button onClick={() => replaceState('/info', {query: '11'})} type="button">
                replace state
            </button>
        </div>
    );
}
