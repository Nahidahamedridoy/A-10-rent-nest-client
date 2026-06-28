import { roleValidator } from '@/lib/api/session';
import React from 'react';

const TenantLayout = async({children}) => {
    await roleValidator("tenant")
    return children
};

export default TenantLayout;