// components/Modal.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles.css";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.classList.add("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={closeOnOverlayClick ? onClose : null}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="modal-close-btn" onClick={onClose}>
              ×
            </button>
          </div>
        )}

        {/* Body */}
        <div className="modal-body">{children}</div>

        {/* Footer */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;

// ----------- CSS ------------------> 
/* Prevent background scroll when modal is open */
.App {
  font-family: sans-serif;
  text-align: center;
}

.modal-open {
  overflow: hidden;
}

/* Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal box */
.modal-container {
  background: #fff;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.25s ease;
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
}

/* Close button */
.modal-close-btn {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}

/* Body */
.modal-body {
  margin-bottom: 12px;
  font-size: 14px;
  color: #333;
}

/* Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Animation */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}


