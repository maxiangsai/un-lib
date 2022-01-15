import * as React from 'react';

function SvgIconServiceApollo(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      className="icon_service_apollo_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path
        d="M642.027 637.952a80.341 80.341 0 0169.93-40.256 80.747 80.747 0 0180.512 80.512 80.747 80.747 0 01-80.512 80.49 80.96 80.96 0 01-69.93-40.255H486.059A181.312 181.312 0 01309.44 859.328a181.013 181.013 0 01-181.12-181.12c0-90.07 65.92-165.035 151.936-178.624l29.184 57.856h-2.005a120.704 120.704 0 00-118.742 120.747A120.47 120.47 0 00309.44 798.955a120.47 120.47 0 00113.707-161.003h218.88z"
        fill="#04A18D"
      />
      <path
        d="M379.883 638.955a79.488 79.488 0 010 80.512c-22.144 38.741-71.446 51.818-110.187 29.674s-51.84-71.445-29.675-110.186a80.853 80.853 0 0169.931-40.256l77.995-135.339c-60.374-56.363-76.48-148.928-33.216-223.403 49.813-86.528 161.002-116.224 247.552-66.41a181.632 181.632 0 0178.997 220.885l-64.917-3.52 1.002-1.515a120.128 120.128 0 00-45.269-163.029c-57.877-33.195-131.84-13.568-165.035 44.288a120.363 120.363 0 0044.267 164.523c12.075 7.04 25.173 11.584 38.25 14.08L379.884 638.955z"
        fill="#83E2D6"
      />
      <path
        d="M509.696 410.539a81.45 81.45 0 01-69.93-40.256 80.747 80.747 0 0129.674-110.187 80.747 80.747 0 01110.187 29.675 79.488 79.488 0 010 80.512L657.62 505.62c78.998-24.661 167.04 8.043 210.326 82.518 49.792 86.549 20.117 197.226-66.432 247.552-77.974 45.269-175.574 25.664-230.934-42.262l35.712-54.357 1.024 1.515a120.619 120.619 0 00164.011 42.261c57.877-33.195 77.483-107.157 44.288-165.035-33.216-57.856-107.179-77.482-165.035-44.266a121.579 121.579 0 00-31.189 26.154L509.696 410.54z"
        fill="#4FC8B9"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgIconServiceApollo);
export default ForwardRef;
