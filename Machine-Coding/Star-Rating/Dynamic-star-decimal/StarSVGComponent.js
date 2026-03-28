export const SvgComponent = ({ percent, color, index }) => {
  const clipId = `clip-${index}`;

  return (
    <svg width="40" height="40" viewBox="0 0 24 24">
      <defs>
        <clipPath id={clipId}>
          <rect
            className="star-fill-rect"
            width={`${percent}%`}
            height="100%"
          />
        </clipPath>
      </defs>

      {/* background star */}
      <path
        d="M12 2l3 6 7 .9-5 4.8 1.2 7.1L12 18l-6.2 3.8L7 13.7 2 8.9 9 8z"
        fill="#000"
      />

      {/* filled part */}
      <path
        d="M12 2l3 6 7 .9-5 4.8 1.2 7.1L12 18l-6.2 3.8L7 13.7 2 8.9 9 8z"
        fill={color}
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
};

// const StarSvg = ({ percentage = 0, size = 40 }) => {
//     const gradientId = `starGradient-${percentage}`;

//     return (
//       <svg
//         width={size}
//         height={size}
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <linearGradient id={gradientId}>
//             <stop offset={`${percentage}%`} stopColor="#FFD700" />
//             <stop offset={`${percentage}%`} stopColor="#E0E0E0" />
//           </linearGradient>
//         </defs>

//         <path
//           d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
//           fill={`url(#${gradientId})`}
//         />
//       </svg>
//     );
//   };

// export default StarSvg;
