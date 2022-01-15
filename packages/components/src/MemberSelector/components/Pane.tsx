import React, { memo } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

interface Props {
  title: string | ReactNode;
}

const Pane = ({ children, title }: PropsWithChildren<Props>) => {
  return (
    <div className="un-pane">
      <div className="un-pane-title">{title}</div>
      <div className="un-pane-content">{children}</div>
    </div>
  );
};

export default memo(Pane);
