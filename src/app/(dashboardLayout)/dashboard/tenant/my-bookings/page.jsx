import DashboardHeading from '@/components/DashboardHeading';
import MyBookingsTable from '@/components/MyBookingsTable';
import { fetchMyBooking } from '@/lib/api/bookings/data';
import { getUser } from '@/lib/api/session';
import React from 'react'

const TenantMyBookings = async() => {
    const user = await getUser();
    // console.log(user);
    const bookings = await fetchMyBooking(user?.email);
    // console.log(bookings ,"booking");
    return (
        <div>
            <DashboardHeading
                title="My Booked Rooms"
                description="All the booked rooms"
            />
            <MyBookingsTable bookings={bookings}/>
        </div>
    );
};

export default TenantMyBookings;