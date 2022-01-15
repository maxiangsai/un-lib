import React, { memo, useMemo } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';

import { Col, Row } from 'antd';

import classNames from 'classnames';
import omit from 'ramda/es/omit';
import splitEvery from 'ramda/es/splitEvery';

export type GridProps = PropsWithChildren<{
  /**
   * 列数
   * @type {number}
   */
  col: number;

  /**
   * 每行的高度
   * @type {number}
   */
  height?: number;

  /**
   * 行样式
   * @type {CSSProperties}
   */
  rowStyle?: CSSProperties;
  /**
   * 网格之间的间距
   * @type {number}
   */
  gutter?: number;
  /**
   * 网格容器样式
   * @type {CSSProperties}
   */
  style?: CSSProperties;
  /**
   * 网格容器类
   * @type {string}
   */
  className?: string;
  /**
   * 网格内容的样式
   * @type {CSSProperties}
   */
  cellStyle?: CSSProperties;
}>;

const Grid = ({
  children,
  col,
  style,
  gutter,
  rowStyle,
  className,
  height,
  cellStyle,
}: GridProps) => {
  const newChildren = useMemo(() => {
    return splitEvery(col, React.Children.toArray(children));
  }, [children, col]);

  const cellStyleCached = useMemo(() => {
    return omit(['width', 'height'], cellStyle);
  }, [cellStyle]);

  return (
    <div className={classNames('un-grid', className)} style={style}>
      {newChildren.map((columns, index) => {
        return (
          <Row
            gutter={gutter}
            style={{
              marginBottom: gutter,
              ...rowStyle,
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={`grid_row_key_${index}`}
          >
            {columns.map((child, i) => {
              return (
                <Col
                  style={{
                    width: `${100 / col}%`,
                    height,
                  }}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`grid_col_key_${i}`}
                >
                  <div className="un-grid-cell" style={cellStyleCached}>
                    {child}
                  </div>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};

export default memo(Grid);
