import { Language } from '../types';
import React from 'react';

export const LanguageContext = React.createContext({
    name: 'Javascript',
} as Language);
