import React from "react";
import { useSelector } from "react-redux";

function Button(props) {
  const {loading} = useSelector((state) => state.user);

  return (
    <div>
      <button
        type="submit"
        style={{backgroundColor:"#006C84"}}
        disabled={loading}
        className="flex w-full items-center justify-center rounded-tl-2xl rounded-tr-md rounded-bl-md rounded-br-2xl px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
      >
        {props.name}
        {loading && (
          <span
            className="animate-spin h-5 ml-2 w-5 border-t-2 border-b-2 border-c4 rounded-full"
            role="status"
            aria-live="polite"
          ></span>
        )}
      </button>
    </div>
  );
}

export default Button;
