import React from 'react';

export const Title = () => {
  return (
    <div
      className="w-full flex justify-center items-baseline"
      style={{
        fontFamily: 'KaiseiOpti',
        textShadow: "0 2px 2px rgba(0, 0, 0, 0.8)"
      }}
    >
      <p className="leading-none text-amber-300 subpixel-antialiased font-medium">
        <span className="text-[5rem] align-baseline tracking-widest">A</span>
        <span className="text-[3rem] align-baseline tracking-widest">URABLE</span>
      </p>
    </div>
  );
};
