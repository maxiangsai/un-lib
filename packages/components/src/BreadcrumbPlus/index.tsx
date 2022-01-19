import React, { useMemo } from 'react';

import { Breadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import type { CSSProperties } from 'react';
import Tree from './TreeList';
import classnames from 'classnames';
import clone from 'ramda/es/clone';

export interface BreadcrumbPlusItem {
  path: string;
  breadTitle: string;
  routes?: BreadcrumbPlusItem[];
  children?: BreadcrumbPlusItem[];
  hasClick?: boolean;
  [key: string]: any;
}

export type MatchData = Record<
  string,
  {
    text: string;
    value: string;
  }
>;

export interface BreadcrumbPlusProps {
  curRoute: string;
  routeConfig: BreadcrumbPlusItem[];
  matchData: MatchData;
  antBreadcrumbProps?: BreadcrumbProps;
  className?: string;
  style?: CSSProperties;
  clickClass?: string;
  itemClass?: string;
  onClickItem?: (
    data: Partial<Pick<BreadcrumbPlusItem, 'path' | 'breadTitle' | 'hasClick'>>,
  ) => void;
}
const engine = (tpl: string, data: Record<string, any>) => {
  const regexp = /{{\s+(.+?)\s+}}/g;
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = regexp.exec(tpl)) !== null) {
    const [m, key] = match;
    // eslint-disable-next-line no-param-reassign
    tpl = tpl.replace(m, key ? data[key] : '');
    regexp.lastIndex = 0;
  }
  return tpl;
};

const convertFromMatchData = (
  data: Partial<BreadcrumbPlusItem>,
  matchData: MatchData,
) => {
  const newData = clone(data);
  const engineData = Object.keys(matchData).reduce(
    (acc, item) => ({ ...acc, [item]: matchData[item].text }),
    {},
  );
  Object.keys(matchData).forEach((key) => {
    newData.path = (newData.path as string).replace(
      `:${key}`,
      matchData[key].value,
    );
  });
  newData.breadTitle = engine(newData.breadTitle as string, engineData);
  return newData;
};

const BreadcrumbPlus = ({
  curRoute,
  routeConfig,
  matchData,
  antBreadcrumbProps,
  className,
  onClickItem,
  style,
  clickClass,
  itemClass,
}: BreadcrumbPlusProps) => {
  const tree = useMemo(() => {
    return new Tree(routeConfig, {
      rootValue: {
        breadTitle: '根',
        path: '/',
      },
      pickData: (data) => ({
        breadTitle: data.breadTitle as string,
        path: data.path as string,
        hasClick: data.hasClick as boolean,
      }),
    });
  }, [routeConfig]);
  /**
   * 1. 在多叉树找到节点路径
   * 2. 替换节点path的动态数据，返回真实渲染面包屑数据
   */
  const paths = useMemo(() => {
    const currentNodes = tree.findPath((node) => {
      const convertedData = convertFromMatchData(node.data, matchData);
      return convertedData.path === curRoute;
    });

    return currentNodes.map((item) => convertFromMatchData(item, matchData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curRoute, matchData]);

  return (
    <div
      className={classnames('unicom-breadcrumb-plus', className)}
      style={style}
    >
      <Breadcrumb {...antBreadcrumbProps}>
        {paths.map((item) => {
          return (
            <Breadcrumb.Item key={item.path as string}>
              {item.hasClick ? (
                <span
                  onClick={() => onClickItem && onClickItem(item)}
                  style={{ cursor: 'pointer' }}
                  className={classnames([clickClass, itemClass])}
                >
                  {item.breadTitle}
                </span>
              ) : (
                <span className={itemClass}>{item.breadTitle}</span>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};
BreadcrumbPlus.defaultProps = {
  curRoute: '',
  routeConfig: [],
  matchData: {},
  antBreadcrumbProps: {},
};
export default BreadcrumbPlus;
