// @ts-ignore
import * as icons from '@un/icons';

import type { CSSProperties } from 'react';
import Icon from '@ant-design/icons';
import React from 'react';

const {
  ArrowRight,
  BookmarkLine,
  IconAdd,
  IconBarChart,
  IconBookmark,
  IconHandCoin,
  IconProject,
  IconQrCode,
  IconRocket,
  IconServiceApi,
  IconServiceApollo,
  IconServiceArchery,
  IconServiceBug,
  IconServiceData,
  IconServiceDatabase,
  IconServiceDevops,
  IconServiceGitlab,
  IconServiceGovernance,
  IconServiceLog,
  IconServiceLoki,
  IconServiceMessage,
  IconServiceNol,
  IconServiceResource,
  IconServiceTapd,
  IconServiceUmi,
  IconServiceYapi,
  IconShieldCheck,
  IconSuccessful,
  IconTime,
  MenuLine,
} = icons;
const map = {
  bookmarkLine: BookmarkLine,
  yapi: IconServiceYapi,
  qrcode: IconQrCode,
  barChart: IconBarChart,
  hand: IconHandCoin,
  bookmark: IconBookmark,
  shieldCheck: IconShieldCheck,
  rocket: IconRocket,
  resource: IconServiceResource,
  apollo: IconServiceApollo,
  archery: IconServiceArchery,
  add: IconAdd,
  api: IconServiceApi,
  bug: IconServiceBug,
  data: IconServiceData,
  database: IconServiceDatabase,
  devops: IconServiceDevops,
  governance: IconServiceGovernance,
  log: IconServiceLog,
  message: IconServiceMessage,
  tapd: IconServiceTapd,
  successful: IconSuccessful,
  time: IconTime,
  nol: IconServiceNol,
  gitlab: IconServiceGitlab,
  ump: IconServiceUmi,
  loki: IconServiceLoki,
  project: IconProject,
  arrowRight: ArrowRight,
  menu2: MenuLine,
};

export type IconMap = typeof map;
export type IconMapType = keyof IconMap;
export interface IconfontProps {
  type: IconMapType;
  className?: string;
  style?: CSSProperties;
}
const Iconfont = ({ type, ...other }: IconfontProps) => {
  const component = map[type] as any;
  return <Icon component={component} {...other} />;
};
export default Iconfont;
