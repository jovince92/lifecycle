import { cn } from '@/lib/utils';
import { ChevronLeftIcon, Lightbulb, LightbulbOff, MenuIcon, PlusCircle, Search } from 'lucide-react';
import {ElementRef, FC, MouseEventHandler, useEffect, useRef, useState} from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import UserItem from './UserItem';
import Item from './Item';
import { useSearch } from '@/Hooks/useSearch';
import { ModeToggle } from '../ModeToggle';
import { useTheme } from '@/Providers/ThemeProvider';
import { useProjectModal } from '@/Hooks/useProjectModal';

interface Props {
    
}

const Navigation:FC<Props> = () => {
    const {onOpen:OpenProjectModal} = useProjectModal();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<'aside'>>(null);
    const navBarRef = useRef<ElementRef<'div'>>(null);
    const [isResetting,setIsResetting] = useState(false);
    const [isCollapsed,setIsCollapsed] = useState(isMobile);

    const { setTheme,theme } = useTheme()
    
    const {onOpen} = useSearch();
    const handleMouseDown:MouseEventHandler<HTMLDivElement> = e =>{
        e.preventDefault();
        e.stopPropagation();

        

        isResizingRef.current=true;
        document.addEventListener('mousemove',handleMouseMove);
        document.addEventListener('mouseup',handleMouseUp);
        
    }

    const handleMouseMove = (e:MouseEvent) =>{
        if(!isResizingRef.current) return;
        let newWidth = e.clientX;
        if(newWidth < 240) newWidth = 240;
        if(newWidth > 480) newWidth = 480;

        if(sidebarRef.current && navBarRef.current){
            sidebarRef.current.style.width = `${newWidth}px`;
            navBarRef.current.style.setProperty('left', `${newWidth}px`);
            navBarRef.current.style.setProperty('width', `calc(100% - ${newWidth})px`)
        }

    }

    const handleMouseUp = () =>{
        isResizingRef.current=false;
        document.removeEventListener('mousemove',handleMouseMove);
        document.removeEventListener('mouseup',handleMouseUp);
    }

    const resetWidth = () =>{
        if(sidebarRef.current && navBarRef.current){
            setIsResetting(true);
            setIsCollapsed(false);
            sidebarRef.current.style.width = isMobile? '100%' : '15rem';
            navBarRef.current.style.setProperty('width',isMobile? '0' : 'calc(100% - 15rem)');
            navBarRef.current.style.setProperty('left',isMobile? '100%':'15rem');

            setTimeout(()=>setIsResetting(false),300);
        }
    }

    const collapse = () =>{
        if(sidebarRef.current && navBarRef.current){
            setIsCollapsed(true);
            setIsResetting(true);
            sidebarRef.current.style.width='0px';
            navBarRef.current.style.setProperty('width','100%');
            navBarRef.current.style.setProperty('left','0');
            setTimeout(()=>setIsResetting(false),300);
        }
    }

    useEffect(()=>{
        if (isMobile) collapse();
        else resetWidth();
    },[isMobile]);

    

    return (
        <>
            <aside ref={sidebarRef} className={cn('group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-10 ',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'w-0'
                )}>
                <div onClick={collapse} role='button' className={cn('h-6 w-6 text-muted-foreground rounded-sm hover:text-primary absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition ',
                        isMobile && 'opacity-100'
                    )}>
                    <ChevronLeftIcon className='h-6 w-6' />
                </div>
                <div className='w-full'>
                    <UserItem />
                    <Item onClick={onOpen} label='Search' Icon={Search} isSearch />
                    <Item onClick={()=>setTheme(theme==='dark'?'light':'dark')} label='Toggle Dark Mode' Icon={theme==='dark'?Lightbulb:LightbulbOff}  />
                    <Item onClick={()=>OpenProjectModal()} label='New Project' Icon={PlusCircle} />
                </div>
                <div className='mt-4'>
                    <p>project list</p>                    
                    <p>new project</p>
                    <Popover>
                        <PopoverTrigger className='w-full mt-3.5'>
                            <p>archive label</p>
                        </PopoverTrigger>
                        <PopoverContent className='p-0 w-72' side={isMobile?'bottom':'right'}>
                            <p>archives</p>
                        </PopoverContent>
                    </Popover>
                </div>
                <div onMouseDown={handleMouseDown} onClick={resetWidth} className='opacity-0 hover:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary right-0 top-0' />
            </aside>
            <div ref={navBarRef} className={cn('absolute top-0 z-[100000] left-60 w-[calc(100%-15rem)]',
                isResetting && 'transition-all ease-in-out duration-300',
                isMobile && 'left-0 w-full'
            )}>
                {/* {!!selected_document?.id?<NavBar isCollapsed={isCollapsed} onResetWidth={resetWidth} />:(
                    <nav className='bg-transparent px-3 py-2 w-full'>
                        {isCollapsed&& <MenuIcon onClick={resetWidth} className='h-6 w-6 text-muted-foreground' role='button' />}                        
                    </nav>
                )} */}
                
            </div>
        </>
    );
};

export default Navigation;