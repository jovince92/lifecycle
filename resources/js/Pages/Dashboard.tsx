import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/inertia-react';
import {FC} from 'react';

interface Props {
    
}

const Dashboard:FC<Props> = () => {
    return (
        <>
            <Head title='Software Lifecycle' />
            <Layout  >
                <div className='pb-40'>
                    project name
                    <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
                        project details
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Dashboard;