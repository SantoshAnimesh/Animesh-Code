import { service } from "./Toastr/Service";

export default function Child() {
  const button = ["success", "error", "info"];

  const handleClick = (buttons) => {
    console.log(buttons);
    service[buttons](buttons);
  };
  return (
    <div className="button-box">
      {button?.map((button, index) => {
        return (
          <button onClick={() => handleClick(button)} key={index}>
            {button}
          </button>
        );
      })}
    </div>
  );
}
