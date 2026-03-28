// Path: hook/useFetch
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

// 🔹 Mock API (for testing)
const apiCall = (page, limit = 20) => {
  const list = Array.from({ length: limit }, (_, index) => {
    const id = (page - 1) * limit + index + 1;
    return {
      id,
      name: `user ${id}`,
    };
  });

  return new Promise((resolve) => {
    setTimeout(() => resolve(list), 500);
  });
};

// 🔹 Real API (optional)
const fetchDummyApi = async (page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;

    const { data, status } = await axios.get("https://dummyjson.com/users", {
      params: {
        limit,
        skip,
        select: "firstName,lastName,age",
      },
    });

    if (status !== 200) {
      throw new Error("Failed to fetch users");
    }
    return data?.users ?? [];
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
};

function useFetch({ page, limit = 20, useMock = false }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(
    async (p) => {
      setLoading(true);
      setError("");

      try {
        const response = useMock
          ? await apiCall(p, limit)
          : await fetchDummyApi(p, limit);

        setData((prev) => [...prev, ...response]);

        // ✅ hasMore based on API response size
        setHasMore(response.length === limit);
      } catch (err) {
        setError(err?.message || "Error occurred");
      } finally {
        setLoading(false);
      }
    },
    [limit, useMock]
  );

  useEffect(() => {
    if (!page) return;
    fetchData(page);
  }, [page, fetchData]);

  return { data, loading, error, hasMore, setData };
}

export default useFetch;
