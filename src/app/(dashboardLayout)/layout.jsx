"use client"
import DashboardSidebar from '@/components/DashboardSidebar';



const DashboardLayout = ({ children }) => {


    return (
        <div className='min-h-screen flex bg-cyan-50'>
            <DashboardSidebar />
            {/* মেইন কন্টেন্ট এরিয়া */}
            <div className="flex-1 p-6 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;