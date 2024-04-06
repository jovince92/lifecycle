import {FC} from 'react';
import { Program } from '@/types';

interface Props {
    program:Program;
}

const BusinessRequirementsDocument:FC<Props> = ({program}) => {
    return (
        <div className='w-full h-full bg-secondary'>
            BusinessRequirementsDocument
        </div>
    );
};

export default BusinessRequirementsDocument;