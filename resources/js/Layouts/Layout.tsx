import Navigation from '@/Components/Navigation/Navigation';
import SearchCommand from '@/Components/SearchCommand';
import { ModalProvider } from '@/Providers/ModalProvider';
import { cn } from '@/lib/utils';
import { Project } from '@/types';
import {FC, ReactNode} from 'react';

interface Props {
    children: ReactNode;
    selected_project?:Project;
}

const Layout:FC<Props> = ({children,selected_project}) => {
    return (
        <>
            <SearchCommand />
            <div className='h-full flex '>
                <Navigation selected_project={selected_project} />
                <main className={cn('flex-1 h-full overflow-y-auto ',!!selected_project&&'pt-14')}>
                    {children}
                </main>
            </div>
            <ModalProvider />
        </>
    );
};

export default Layout;