import type { CSSProperties, PropsWithChildren } from 'react';

declare type CommonProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
}>;
