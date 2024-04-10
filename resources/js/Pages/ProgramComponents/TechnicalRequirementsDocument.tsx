import { Button } from '@/Components/ui/button';
import { Program } from '@/types';
import {FC, useState} from 'react';

interface Props {
    program:Program;
}

const TechnicalRequirementsDocument:FC<Props> = ({program}) => {
    const [showNewTechnicalRequirementsDocument,setShowNewTechnicalRequirementsDocument] = useState(false);
    const [showNewTechnicalRequirementsItem,setShowNewTechnicalRequirementsItem] = useState(false);
    return (
        <>
            <div className='w-full h-full border rounded-lg flex items-center justify-center'>
                {
                    !program.techinical_requirement_document ?(
                        <div className='flex flex-col gap-y-5'>
                            <h3 className='text-lg !font-bold'>
                                No Technical Requirements Document
                            </h3>
                            <Button onClick={()=>{}}>
                                Create Technical Requirements Document
                            </Button>
                        </div>
                    ):(
                        <>
                            <div className='h-full max-w-[40rem] flex flex-col gap-y-0.5'>
                                <div className='h-auto flex items-center justify-between gap-x-2'>
                                    
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default TechnicalRequirementsDocument;