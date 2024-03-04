import './bootstrap';

import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { ThemeProvider } from './Providers/ThemeProvider';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
                <App {...props} />
            </ThemeProvider>            
        );
    },
});




InertiaProgress.init({ color: '#8b5cf6',delay:10 });
