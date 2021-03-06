import * as React from 'react';

function SvgIconServiceLoki(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      className="icon_service_loki_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path
        d="M148.48 224.405l27.243-3.84L252.33 765.74l-27.243 3.84zm251.776-21.482l27.264-3.84 74.048 526.997-27.243 3.84zM362.56 231.38l27.243-3.84 70.869 504.32-27.243 3.84zm-71.893-50.112l27.242-3.84 79.83 567.894-27.264 3.84zm-107.712-8.042l27.264-3.819 82.986 590.613-27.242 3.84zm57.237-54.379l27.243-3.84 89.386 636.075-27.242 3.84z"
        fill="#4FC8B9"
      />
      <path
        d="M230.187 805.93l68.16-9.578 9.6 68.16-68.16 9.579zm14.698 104.491l68.16-9.6 9.558 68.182-68.139 9.578zm89.792-119.168l68.16-9.6 9.579 68.16-68.16 9.6zm14.699 104.491l68.139-9.6 9.6 68.16-68.16 9.6zm89.792-119.19l68.16-9.578 9.579 68.16-68.16 9.579zm14.699 104.513l68.138-9.6 9.6 68.16-68.16 9.578z"
        fill="#04A18D"
      />
      <path
        d="M552.768 760.597l304.405-42.773 9.579 68.139-304.427 42.794zm14.699 104.47l304.384-42.752 9.578 68.138-304.405 42.774z"
        fill="#83E2D6"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgIconServiceLoki);
export default ForwardRef;
