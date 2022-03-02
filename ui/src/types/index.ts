import { ReactElement } from 'react';

export interface LinkItemProps {
    name: string;
    icon: ReactElement;
    route: string;
}
export interface Flavor {
    name: string;
}

export interface Language {
    name: string;
}

export const Flavors: Array<Flavor> = [
    { name: 'JSTL' },
    { name: 'JINJA' },
    { name: 'EJS' },
];

export const Languages: Array<Language> = [
    { name: 'Text' },
    { name: 'Javascript' },
    { name: 'Typescript' },
    { name: 'HTML' },
];
