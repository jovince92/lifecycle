import Navigation from '@/Components/Navigation/Navigation';
import SearchCommand from '@/Components/SearchCommand';
import { ModalProvider } from '@/Providers/ModalProvider';
import {FC, ReactNode} from 'react';

interface Props {
    children: ReactNode;
}

const Layout:FC<Props> = ({children}) => {
    return (
        <>
            <SearchCommand />
            <div className='h-full flex '>
                <Navigation />
                <main className='flex-1 h-full overflow-y-auto'>
                    {children}
                </main>
            </div>
            <ModalProvider />
        </>
    );
};

export default Layout;