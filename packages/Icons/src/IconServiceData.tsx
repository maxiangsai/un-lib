import * as React from 'react';

function SvgIconServiceData(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      className="icon_service_data_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path d="M805.344 192H218.656A26.656 26.656 0 00192 218.656V700.8c0 14.72 11.936 26.656 26.656 26.656h586.688c14.72 0 26.656-11.936 26.656-26.656V218.656A26.656 26.656 0 00805.344 192zm-26.688 482.144H245.344v-428.8h533.312v428.8zm-88.064 104.512H333.408a26.656 26.656 0 000 53.344h357.184a26.656 26.656 0 000-53.344z" />
      <path d="M320.32 572.96a37.184 37.184 0 0033.952-47.68l85.344-89.472a30.464 30.464 0 0019.2 0l84.736 89.6a50.432 50.432 0 00-.928 8.384 35.648 35.648 0 1071.168 0 38.24 38.24 0 00-1.056-8.384l84.096-89.6c2.272.224 4.576.224 6.848 0a37.632 37.632 0 10-33.216-24.544L589.44 496.96a30.464 30.464 0 00-22.4 0l-83.648-88.544a35.52 35.52 0 10-69.632-10.048c.032 3.392.512 6.752 1.344 10.048L329.92 498.56a34.144 34.144 0 00-9.6-1.536 37.632 37.632 0 000 75.136v.768z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgIconServiceData);
export default ForwardRef;
