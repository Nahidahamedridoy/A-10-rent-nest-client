import DashboardHeading from '@/components/DashboardHeading';
import { fetchMyBooking } from '@/lib/api/bookings/data';
import { getUser } from '@/lib/api/session';
import React from 'react'

const TenantMyBookings = async() => {
    const user = getUser();
    const bookings = await fetchMyBooking(user?.email);
    console.log(bookings);
    return (
        <div>
            <DashboardHeading
                title="My Booked Rooms"
                description="All the booked rooms"
            />
            MyBookings
        </div>
    );
};

export default TenantMyBookings;