import {ReactNode, StrictMode} from 'react';

type PropsType = {
    children: ReactNode;
};

export function AppProvider(props: PropsType): JSX.Element {
    const {children} = props;

    return <StrictMode>{children}</StrictMode>;
}
