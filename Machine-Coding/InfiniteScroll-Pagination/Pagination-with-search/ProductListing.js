
import { useState, useCallback, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import usePagination from "../hooks/usePagination";
import Card from "./Card";

function ProductListing() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, loading, error, hasMore } = useFetch({ page });
  const debouncedSearch = useDebounce(search, 500);

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const { lastElement } = usePagination({
    loading,
    hasMore,
    callback: handleLoadMore,
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const UserList = useMemo(() => {
    if (debouncedSearch.trim()) {
      return data?.filter((list) =>
        list.firstName?.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    return data;
  }, [data, debouncedSearch]);

  return (
    <div className="product-container">
      <h2>Product Listing</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="list-box">
        {UserList.map((user) => (
          <Card user={user} key={user.id} />
        ))}

        {/* Error */}
        {error && <p className="error">{error}</p>}

        {/* Loading */}
        {loading && <p className="loading">Loading...</p>}

        {/* Observer (sentinel) */}
        {!loading && hasMore && <div className="observer" ref={lastElement} />}

        {/* No More Data */}
        {!loading && !hasMore && !error && (
          <p className="loading">No More Data Found</p>
        )}
      </div>
    </div>
  );
}

export default ProductListing;
