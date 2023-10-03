export const DarkModeIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      aria-hidden='true'
    >
      <path
        fillRule='evenodd'
        d='M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z'
        clipRule='evenodd'
      />
    </svg>
  );
};

export const LightModeIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2.2}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
      />
    </svg>
  );
};

export const LogoSvg = (
  <svg
    className='h-10 w-10'
    viewBox='-2.4 -2.4 28.80 28.80'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    transform='rotate(45)'
    aria-hidden='true'
  >
    <g
      id='SVGRepo_bgCarrier'
      strokeWidth='0'
      transform='translate(0.7200000000000006,0.7200000000000006), scale(0.94)'
    >
      <path
        transform='translate(-2.4, -2.4), scale(1.7999999999999998)'
        d='M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z'
        strokeWidth='0'
        fill='#64748b'
      ></path>
    </g>
    <g
      id='SVGRepo_tracerCarrier'
      strokeLinecap='round'
      strokeLinejoin='round'
      stroke='#CCCCCC'
      strokeWidth='0.048'
    ></g>
    <g id='SVGRepo_iconCarrier'>
      <rect
        x='6'
        y='4'
        width='13'
        height='17'
        rx='2'
        fill='#000000'
        fillOpacity='0.24'
        stroke='#4ade80'
        strokeWidth='1.2'
      ></rect>
      <path d='M15 10V8' stroke='#4ade80' strokeWidth='1.2' strokeLinecap='round'></path>
      <path d='M4 9H8' stroke='#4ade80' strokeWidth='1.2' strokeLinecap='round'></path>
      <path d='M4 13H8' stroke='#4ade80' strokeWidth='1.2' strokeLinecap='round'></path>
      <path d='M4 17H8' stroke='#4ade80' strokeWidth='1.2' strokeLinecap='round'></path>
    </g>
  </svg>
);
