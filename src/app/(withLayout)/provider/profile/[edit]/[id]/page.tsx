import UpdateProviderProfile from '@/components/UI/UpdateProviderProfile';
import React from 'react';

type IDProps = {
    params: any;
  };
  

const UpdateProfile = ({ params }: IDProps) => {
    const { id } = params;
    return (
        <>
            <UpdateProviderProfile id={id} />
        </>
    );
};

export default UpdateProfile;