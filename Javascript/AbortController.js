

// ------- for JS ---------->
  import axios from "axios";

const fetchData = () => {
  const controller = new AbortController();

  const request = async () => {
    try {
      const res = await axios.get("/api/data", {
        signal: controller.signal,
      });
      console.log(res.data);
    } catch (err) {
      if (axios.isCancel(err) || err.code === "ERR_CANCELED") {
        console.log("Request canceled");
      } else {
        console.error(err);
      }
    }
  };

  return { request, cancel: () => controller.abort() };
};

// usage
const { request, cancel } = fetchData();

request();

// cancel when needed
cancel();

// ............. For React ----------------
import { useRef, useState, useCallback } from "react";
import axios from "axios";

export function useAbortableRequest() {
  const controllerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (config) => {
    // cancel previous request
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await axios({
        ...config,
        signal: controller.signal,
      });

      return res.data;
    } catch (err) {
      if (err.code === "ERR_CANCELED") {
        console.log("Request canceled");
      } else {
        setError(err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancel = () => {
    controllerRef.current?.abort();
  };

  return { sendRequest, cancel, loading, error };
}


// --------- calling Hook -----------
import React from "react";
import { useAbortableRequest } from "./useAbortableRequest";

function MyComponent() {
  const { sendRequest, cancel, loading, error } = useAbortableRequest();

  const fetchData = async () => {
    try {
      const data = await sendRequest({
        method: "GET",
        url: "/api/data",
      });
      console.log(data);
    } catch (e) {}
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch"}
      </button>

      <button onClick={cancel}>Cancel</button>

      {error && <p>Error occurred</p>}
    </div>
  );
}
