import React, { memo } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

interface Props {
  title: string | ReactNode;
}

const Pane = ({ children, title }: PropsWithChildren<Props>) => {
  return (
    <div className="unicom-pane">
      <div className="unicom-pane-title">{title}</div>
      <div className="unicom-pane-content">{children}</div>
    </div>
  );
};

export default memo(Pane);
