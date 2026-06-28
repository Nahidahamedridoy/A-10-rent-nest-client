import Link from "next/link";

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold  mb-4">Unauthorized Access</h1>
            <p className="text-lg text-slate-400 mb-6">You do not have permission to view this page.</p>
            <Link href="/" className="px-4 py-2 bg-sky-500  rounded hover:bg-sky-700 transition">
                Go to Home
            </Link>
        </div>
    );
};

export default Unauthorized;