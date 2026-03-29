import { useEffect, useState } from "react";
import { service } from "../Toastr/Service";
import "./toastr.css";

export default function ToastrContainer() {
  const [toastr, setToastr] = useState([]);

  useEffect(() => {
    const unSubscribe = service.subscribe((type, msg) => {
      console.log(type, msg);
      const id = Date.now() * Math.random();
      setToastr((prev) => [...prev, { id: id, type, msg }]);

      setTimeout(() => {
        setToastr((prev) => prev.filter((items) => items.id !== id));
      }, 5000);
    });

    return unSubscribe;
  }, []);

  console.log(toastr);

  return (
    <div className="toast-container">
      {toastr?.map((toast, index) => {
        return (
          <div
            key={`${toast.id}`}
            className={`toast ${toast.type && toast.type}`}
          >
            <p>{toast.msg}</p>
          </div>
        );
      })}
    </div>
  );
}
