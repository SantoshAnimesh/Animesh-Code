.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 280px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  padding: 14px 18px;
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: 0;
  animation: fadeIn 0.5s forwards, fadeOut 0.4s forwards 4.2s;
}

/* Animations */

/* Types */
.toast.success {
  background: linear-gradient(45deg, #4caf50, #66bb6a);
}
.toast.error {
  background: linear-gradient(45deg, #f44336, #e57373);
}
.toast.warning {
  background: linear-gradient(45deg, #ff9800, #ffb74d);
}
.toast.info {
  background: linear-gradient(45deg, #2196f3, #64b5f6);
}

/* Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
