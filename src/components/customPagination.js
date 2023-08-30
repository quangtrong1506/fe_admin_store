import {
    FaAnglesLeft,
    FaAnglesRight,
    FaChevronLeft,
    FaChevronRight,
} from 'react-icons/fa6';
import { Link, useSearchParams } from 'react-router-dom';
const CustomPagination = function ({ page, pages, handleChange = () => {} }) {
    const [searchQuery, setSearchQuery] = useSearchParams();
    if (page === 1 && page === pages) return <></>;
    function getQuery(page) {
        let query = {};
        searchQuery.forEach((value, key) => {
            if (key !== 'page') query[key] = value;
        });
        query.page = page;
        return query;
    }
    function handleClick(e, query) {
        e.preventDefault();
        if (query.page && query.page !== page) {
            setSearchQuery(query);
            handleChange(query.page);
        }
    }
    return (
        <>
            {page > 1 && (
                <>
                    <Link
                        onClick={(e) => {
                            handleClick(e, getQuery(1));
                        }}
                    >
                        <FaAnglesLeft className="svg-fa" />
                    </Link>
                    <Link
                        onClick={(e) => {
                            handleClick(e, getQuery(page - 1));
                        }}
                    >
                        <FaChevronLeft className="svg-fa" />
                    </Link>
                    {page > 2 && page === pages && (
                        <Link
                            onClick={(e) => {
                                handleClick(e, getQuery(page - 2));
                            }}
                        >
                            {page - 2}
                        </Link>
                    )}
                    <Link
                        onClick={(e) => {
                            handleClick(e, getQuery(page - 1));
                        }}
                    >
                        {page - 1}
                    </Link>
                </>
            )}

            <Link
                onClick={(e) => {
                    handleClick(e, getQuery(page));
                }}
                className="active"
            >
                {page}
            </Link>

            {page < pages && (
                <>
                    <Link
                        onClick={(e) => {
                            handleClick(e, getQuery(page + 1));
                        }}
                    >
                        {page + 1}
                    </Link>
                </>
            )}
            {page + 1 < pages && page === 1 && (
                <>
                    <Link
                        onClick={(e) => {
                            handleClick(e, getQuery(page + 2));
                        }}
                    >
                        {page + 2}
                    </Link>
                </>
            )}
            {page < pages && (
                <>
                    <Link
                        onClick={(e) => {
                            handleClick(e, getQuery(page + 1));
                        }}
                    >
                        <FaChevronRight className="svg-fa" />
                    </Link>
                    <Link
                        onClick={(e) => {
                            handleClick(e, getQuery(pages));
                        }}
                    >
                        <FaAnglesRight className="svg-fa" />
                    </Link>
                </>
            )}
        </>
    );
};

export default CustomPagination;
