import { Project } from '@/types';
import { MenuIcon } from 'lucide-react';
import {FC} from 'react';
import Title from './Title';
import Menu from './Menu';
import Banner from './Banner';

interface Props {
    isCollapsed:boolean;
    onResetWidth:()=>void;
    selected_project?:Project;
}

const NavBar:FC<Props> = ({isCollapsed,onResetWidth,selected_project}) => {
    if (!selected_project) return null;
    return (
        <>
            <nav className='px-2.5 py-1.5 w-full flex items-center gap-x-3.5 border-b border-b-secondary'>
                {isCollapsed&&<MenuIcon role='button' onClick={onResetWidth} className='w-6 h-6 text-muted-foreground' />}
                <div className='flex items-center justify-between w-full'>
                    <Title project={selected_project} />
                    {selected_project.is_archived!==1&&(
                        <div className='flex items-center gap-x-2 z-50'>
                            <Menu updateDate={new Date(selected_project.updated_at)} project={selected_project} />
                        </div>
                    )}
                    
                </div>
            </nav>
            {selected_project.is_archived===1 && <Banner id={selected_project.id} />}
        </>
    )
};

export default NavBar;