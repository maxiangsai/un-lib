import * as React from 'react';

function SvgIconServiceGitlab(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      className="icon_service_gitlab_svg__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path
        d="M893.739 553.664l-42.923-132.096-85.056-261.781c-4.373-13.483-23.445-13.483-27.819 0l-85.077 261.76H370.389l-85.077-261.803c-4.373-13.461-23.424-13.461-27.797 0l-85.078 261.824-42.922 132.096a29.227 29.227 0 0010.624 32.704l371.477 269.888 371.499-269.888c10.24-7.467 14.528-20.65 10.624-32.704"
        fill="#FC6D26"
      />
      <path d="M511.637 856.277l141.227-434.709H370.411z" fill="#04A18D" />
      <path d="M511.637 856.277L370.411 421.59H172.437z" fill="#4FC8B9" />
      <path
        d="M172.437 421.568l-42.922 132.096a29.227 29.227 0 0010.624 32.704l371.498 269.91-339.2-434.71z"
        fill="#83E2D6"
      />
      <path
        d="M172.459 421.568h197.93l-85.077-261.824c-4.373-13.461-23.424-13.461-27.797 0l-85.056 261.824z"
        fill="#04A18D"
      />
      <path d="M511.637 856.277L652.864 421.59h197.973z" fill="#4FC8B9" />
      <path
        d="M850.837 421.568l42.923 132.096a29.227 29.227 0 01-10.624 32.704l-371.477 269.91 339.178-434.731z"
        fill="#83E2D6"
      />
      <path
        d="M850.816 421.568H652.864l85.077-261.824c4.374-13.461 23.446-13.461 27.819 0l85.056 261.824z"
        fill="#04A18D"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgIconServiceGitlab);
export default ForwardRef;
