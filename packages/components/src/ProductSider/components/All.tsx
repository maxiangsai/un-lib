import React, { useCallback } from 'react';
import type { CSSProperties } from 'react';

import Iconfont from '../../Iconfont';
import { useProductSider } from '../context';

interface Props {
  style?: CSSProperties;
}

const All = (props: Props) => {
  const { collapsed, changeCollapsed, openMask } = useProductSider();

  const hoverHandle = useCallback(() => {
    changeCollapsed(false);
    openMask();
  }, [changeCollapsed, openMask]);

  return (
    <div
      className="un-product-sider-all"
      style={props.style ? props.style : {}}
      onClick={hoverHandle}
    >
      <div className="left">
        <Iconfont className="icon" type="menu2" />
        {!collapsed && <span className="text">全部产品及服务</span>}
      </div>
      {!collapsed && <Iconfont className="icon" type="arrowRight" />}
    </div>
  );
};

export default All;
