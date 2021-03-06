import * as React from 'react';

function SvgIconServiceUmi(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      className="icon_service_umi_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path
        d="M512 149.333c200.299 0 362.667 162.368 362.667 362.667l-.086 8.107H742.955L654.784 320.49l-1.216-2.411c-9.963-17.579-36.053-16.555-44.587 1.77l-1.002 2.497-106.24 303.104-109.654-243.798-1.237-2.41a25.195 25.195 0 00-41.6-2.752l-1.621 2.346-86.358 141.27H149.42l-.086-8.107c0-200.299 162.368-362.667 362.667-362.667z"
        fill="#4FC8B9"
      />
      <path
        d="M634.41 399.083l69.1 156.373 1.215 2.41a25.154 25.154 0 0019.136 12.46l2.688.149h143.424C842.027 742.976 692.395 874.667 512 874.667S181.973 742.976 154.027 570.475h121.386l2.902-.171a25.158 25.158 0 0016.938-9.493l1.664-2.39 68.779-112.597 115.968 257.835 1.216 2.389c10.005 17.43 35.904 16.363 44.459-1.792l1.066-2.603 106.027-302.57z"
        fill="#04A18D"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgIconServiceUmi);
export default ForwardRef;
