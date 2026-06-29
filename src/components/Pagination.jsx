import Link from "next/link";

const Pagination = ({ currentPage, totalPages, basePath }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <Link
                href={`${basePath}?page=${currentPage - 1}`}
                className={`px-4 py-2 border rounded ${
                    currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-gray-100"
                }`}
            >
                Prev
            </Link>

            {Array.from({ length: totalPages }, (_, index) => (
                <Link
                    key={index}
                    href={`${basePath}?page=${index + 1}`}
                    className={`px-4 py-2 border rounded ${
                        currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                    }`}
                >
                    {index + 1}
                </Link>
            ))}

            <Link
                href={`${basePath}?page=${currentPage + 1}`}
                className={`px-4 py-2 border rounded ${
                    currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-gray-100"
                }`}
            >
                Next
            </Link>
        </div>
    );
};

export default Pagination;