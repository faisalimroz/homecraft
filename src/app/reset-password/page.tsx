import ResetPassword from '@/components/pages/ResetPassword/ResetPassword';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <Suspense fallback="Loading">
            <ResetPassword/>
        </Suspense>
    );
};

export default page;