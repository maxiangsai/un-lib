import React from 'react';
import type { ReactNode } from 'react';

import { Dropdown, Menu, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './style/index.less';

export interface HeaderProps {
  /**
   * @description logo提示文案
   * @default 豌豆云平台
   */
  logoTooltip?: string;

  /**
   * @description 点击logo跳转链接
   */
  logoLink?: string;

  /**
   * @description 用户名
   */
  username: string;

  /**
   * @description Logo图片
   */
  logoImage?: ReactNode;

  /**
   * @description 左侧插槽
   */
  leftNode?: ReactNode;

  /**
   * @description 右侧插槽
   */
  rightNode?: ReactNode;

  /**
   * @description 扩展下拉菜单
   */
  dropdownList?: { text: string; handle: () => void }[];
}
const defaultLogo =
  '//prod-xnpt-oss-2.oss-cn-shenzhen.aliyuncs.com/cloud-static-files/header-logo.png';
const Header = (props: HeaderProps) => {
  const menu = (
    <Menu>
      {props.dropdownList &&
        props.dropdownList.length > 0 &&
        props.dropdownList.map((item) => {
          return (
            <Menu.Item onClick={item.handle} key={item.text}>
              {item.text}
            </Menu.Item>
          );
        })}
    </Menu>
  );

  return (
    <div className="un-header">
      <div className="un-header-left">
        <div className="un-header-logo">
          <a
            href={props.logoLink}
            target="_blank"
            className="un-header-logo__image"
          >
            <Tooltip title={props.logoTooltip} placement="bottom">
              {props.logoImage ? props.logoImage : <img src={defaultLogo} />}
            </Tooltip>
          </a>
        </div>
        <div className="un-header-left__node">{props.leftNode}</div>
      </div>
      <div className="un-header-right">
        <div className="un-header-right__node">{props.rightNode}</div>
        <div className="un-header-userbox">
          <Dropdown
            className="un-header-dropdown"
            overlayClassName="un-header-dropdown__wrap"
            overlay={menu}
          >
            <div className="un-header-userbox__username">
              <span>{props.username}</span>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {
  logoLink: 'http://cloud.vipthink.net/index.html',
  logoTooltip: '豌豆云平台',
};

export default Header;
