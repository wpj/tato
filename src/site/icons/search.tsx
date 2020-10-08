import * as React from 'react';

function SvgSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="search_svg__feather search_svg__feather-search"
      {...props}
    >
      <circle cx={11} cy={11} r={8} />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

export default SvgSearch;
