import type {
  AssertService,
  DevopsPagerResult,
  DevopsResult,
  ServiceConfig,
} from './types';

import axios from 'axios';
import { notification } from 'antd';

export const getAssetContext = (host: string) =>
  `${host}/vipthink-devops-asset-service/api/v1`;
const tenantId = 'b84bb5c2d7ff42e186458aaa826593d7';

const appId = '1174325822496964600';

axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  (data) => data,
  (error) => {
    const res = error.response;
    notification.error({
      message: `接口【${res.config.url}】异常: ${res.data.message}`,
    });
    return Promise.reject(error);
  },
);

export const getDepartmentList = (
  data: AssertService.IDeptQuery,
  conf: ServiceConfig,
) => {
  const url = `${getAssetContext(conf.host)}/department/getDepartList`;

  return axios.get<DevopsPagerResult<AssertService.IDept>>(url, {
    params: {
      ...data,
      _: Date.now(),
      tenantId,
    },
    headers: {
      Authorization: `Bearer ${conf.token}`,
    },
  });
};

export const getProjectMemberList = (
  data: AssertService.ProjectMemberQuery,
  conf: ServiceConfig & { projectId: string },
) => {
  const url = `${getAssetContext(conf.host)}/projects/${
    conf.projectId
  }/members/user`;
  return axios.get<DevopsPagerResult<AssertService.ProjectMember>>(url, {
    params: {
      ...data,
      tenantId,
      appId,
      _: Date.now(),
    },
    headers: {
      Authorization: `Bearer ${conf.token}`,
    },
  });
};

export const getProductList = (conf: ServiceConfig) => {
  const url = `${getAssetContext(conf.host)}/product/list`;
  return axios.get<DevopsResult<AssertService.ProductResp>>(url, {
    params: {
      tenantId,
      appId,
      _: Date.now(),
    },
    headers: {
      Authorization: `Bearer ${conf.token}`,
    },
  });
};

export const getSubscribeProductList = (conf: ServiceConfig) => {
  return axios.get<DevopsResult<AssertService.ProductVO[]>>(
    `${getAssetContext(conf.host)}/productSubscribe/list`,
    {
      params: {
        tenantId,
        appId,
        _: Date.now(),
      },
      headers: {
        Authorization: `Bearer ${conf.token}`,
      },
    },
  );
};

export const subscribeProduct = (productId: string, conf: ServiceConfig) => {
  return axios.post(
    `${getAssetContext(conf.host)}/productSubscribe/${productId}`,
    {
      tenantId,
      appId,
      _: Date.now(),
    },
    {
      headers: {
        Authorization: `Bearer ${conf.token}`,
      },
    },
  );
};

export const cancelSubscribeProduct = (
  productId: string,
  conf: ServiceConfig,
) => {
  return axios.post(
    `${getAssetContext(conf.host)}/productSubscribe/cancel/${productId}`,
    {
      tenantId,
      appId,
      _: Date.now(),
    },
    {
      headers: {
        Authorization: `Bearer ${conf.token}`,
      },
    },
  );
};

export default axios;
