import React, { memo } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

interface Props {
  title: string | ReactNode;
}

const Pane = ({ children, title }: PropsWithChildren<Props>) => {
  return (
    <div className="xt-pane">
      <div className="xt-pane-title">{title}</div>
      <div className="xt-pane-content">{children}</div>
    </div>
  );
};

export default memo(Pane);
