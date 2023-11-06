export const Logo = () => {
  return (
    <div className="flex gap-1">
      <svg
        className="h-10 w-10"
        viewBox="-2.4 -2.4 28.80 28.80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(45)"
        aria-hidden="true"
      >
        <g
          id="SVGRepo_bgCarrier"
          strokeWidth="0"
          transform="translate(0.7200000000000006,0.7200000000000006), scale(0.94)"
        >
          <path
            transform="translate(-2.4, -2.4), scale(1.7999999999999998)"
            d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
            strokeWidth="0"
            fill="#64748b"
          ></path>
        </g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="0.048"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <rect
            x="6"
            y="4"
            width="13"
            height="17"
            rx="2"
            fill="#000000"
            fillOpacity="0.24"
            stroke="#4ade80"
            strokeWidth="1.2"
          ></rect>
          <path
            d="M15 10V8"
            stroke="#4ade80"
            strokeWidth="1.2"
            strokeLinecap="round"
          ></path>
          <path
            d="M4 9H8"
            stroke="#4ade80"
            strokeWidth="1.2"
            strokeLinecap="round"
          ></path>
          <path
            d="M4 13H8"
            stroke="#4ade80"
            strokeWidth="1.2"
            strokeLinecap="round"
          ></path>
          <path
            d="M4 17H8"
            stroke="#4ade80"
            strokeWidth="1.2"
            strokeLinecap="round"
          ></path>
        </g>
      </svg>

      <div className="flex flex-col justify-center text-lg leading-none">
        <p className="font-bold text-green-500">Note</p>
        <p className="font-semibold text-slate-500">Set</p>
      </div>
    </div>
  );
};
