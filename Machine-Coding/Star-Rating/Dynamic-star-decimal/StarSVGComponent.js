

---------Simple way ---------->
  import { useId } from "react";

export const Star = ({ percent }) => {
  const gradientId = useId(); // unique id

  return (
    <svg width="100" height="100" viewBox="0 0 51 48">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${percent}%`} stopColor="gold" />
          <stop offset={`${percent}%`} stopColor="lightgray" />
        </linearGradient>
      </defs>

      <path
        fill={`url(#${gradientId})`}
        d="m25.5 0 6.5 19.5h20.5l-16.5 12 6.5 19.5-17-12-17 12 6.5-19.5-16.5-12h20.5z"
      />
    </svg>
  );
};

--------------------------------------->


// export const SvgComponent = ({ percent, color, index }) => {
//   const clipId = `clip-${index}`;

//   return (
//     <svg width="40" height="40" viewBox="0 0 24 24">
//       <defs>
//         <clipPath id={clipId}>
//           <rect
//             className="star-fill-rect"
//             width={`${percent}%`}
//             height="100%"
//           />
//         </clipPath>
//       </defs>

//       {/* background star */}
//       <path
//         d="M12 2l3 6 7 .9-5 4.8 1.2 7.1L12 18l-6.2 3.8L7 13.7 2 8.9 9 8z"
//         fill="#000"
//       />

//       {/* filled part */}
//       <path
//         d="M12 2l3 6 7 .9-5 4.8 1.2 7.1L12 18l-6.2 3.8L7 13.7 2 8.9 9 8z"
//         fill={color}
//         clipPath={`url(#${clipId})`}
//       />
//     </svg>
//   );
// };


