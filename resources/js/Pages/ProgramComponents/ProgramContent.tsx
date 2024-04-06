import { LifeCycle, Program } from "@/types";
import { FC } from "react";
import BusinessRequirementsDocument from "./BusinessRequirementsDocument";

interface Props{
    cycle:LifeCycle;
    program:Program;
}

const ProgramContent:FC<Props> = ({cycle,program}) =>{
    switch (cycle){
        case 'Business Requirements Document': return <BusinessRequirementsDocument program={program} />
        default: return <div>Internal Error. Please refresh the page</div>
    }
}

export default ProgramContent;