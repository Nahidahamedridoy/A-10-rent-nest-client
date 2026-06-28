import { roleValidator } from '@/lib/api/session';
import React from 'react';

const OwnerLayout = async({children}) => {
    await roleValidator("owner")
    return children
};

export default OwnerLayout;