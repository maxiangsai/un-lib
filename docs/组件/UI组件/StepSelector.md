# StepSelector 步骤选择器

## 代码演示

```tsx
import { Alert, Button, Form, Input, List, Space, Tag, message }  from 'antd';
import { Iconfont, StepSelector } from '@unicom/components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, {useMemo, useRef, useState}  from 'react';

import axios from 'axios';
import { useRequest } from 'ahooks';

const instance = axios.create()

instance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  cfg.params = {
    ...cfg.params,
    _: Date.now(),
  };
  return cfg;
});
instance.interceptors.response.use(res=>res.data)

// IAM 相关信息
const IAM_HOST = 'https://dev-auth-new.vipthink.cn';
// DEVOPS 信息
const DEVOPS_HOST = 'http://dev-devops.vipthink.net';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [uid, setUid] = useState(parseInt(localStorage.getItem('uid')) || 0);
  const { run, loading } = useRequest(
    (data: { account: string; password: string }) =>
      instance.post(`${IAM_HOST}/v1/auth/admin/token`, {
        account: data.account,
        password: data.password,
      }),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 0) {
          const { token, uid } = res.data;
          localStorage.setItem('token', token);
          localStorage.setItem('uid', uid);
          setToken(token);
          setUid(uid);
        } else {
          message.error(res.info);
        }
      },
    },
  );
  const isLogin = useMemo(() => !!token, [token]);
  const reLogin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    setToken('');
    setUid(0);
  };
  return {
    submitting: loading,
    isLogin,
    submit: run,
    token,
    uid,
    reLogin,
  };
};
const LoginForm = ({ submit, submitting }) => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}
    >
      <Form onFinish={submit} style={{ width: '500px' }} size="large">
        <Alert
          style={{ marginBottom: '30px' }}
          type="info"
          title="提示"
          message="因组件需要用到devops的业务接口，所以这里需要用户tokne，这里模拟iam的登录，点击登录按钮"
        />
        <Form.Item
          name="account"
          rules={[{ required: true, message: '账号不能为空' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" block type="primary" loading={submitting}>
            点我登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


const fetchAppList = (params) => {
  return instance.get(`${DEVOPS_HOST}/vipthink-devops-asset-service/api/v1/projects/app/page`, {
    params
  })
}
const fetchEnvList = (projectId) => {
  return instance.get(`${DEVOPS_HOST}/vipthink-devops-asset-service/api/v2/projects/${projectId}/environments/getList`)
}


const getSlsLog = (appId, data)=>{
  return instance.get(`${DEVOPS_HOST}/vipthink-devops-ops-service/api/v1/cluster/log/sls/${appId}`,{
    params: data
  })
}



export default  ()=>{
  const ssref = useRef(null)
  const { submit, isLogin, submitting, reLogin } = useAuth();
  const steps = [
      {
        title: '应用',
        stepKey: 'app',
        searchFormSchema: [
          {
             dataIndex: 'appName',
             title: '应用名称',
             fieldProps: {
               placeholder: '请输入应用名称',
             }
          }
        ],
        renderItem: (data)=>{
          return (
            <List.Item style={{borderBottom: '1px solid #efefef'}}>
               <List.Item.Meta
                  avatar={<Iconfont style={{fontSize: 40}} type="nol"/>}
                  title={data.name}
                  description={
                    <Space>
                      <span>工程ID：{data.projectName}</span>
                      <span>工程名称：{data.projectDesc}</span>
                    </Space>
                  }
               />
             </List.Item>
          )
        },
        pagination: {
          size: 5
        },
        service: ({page, size, ...data})=> {
          return fetchAppList({size, index: page, ...data }).then(res=>{
            return {
              data:  res.payload.rows,
              total: res.payload.total
            }
          })
        }
      },
      {
        title: '环境',
        stepKey: 'env',
        renderItem: (data)=>{
          return (
            <List.Item style={{borderBottom: '1px solid #efefef'}}>
              <List.Item.Meta
                 avatar={<Iconfont style={{fontSize: 20}} type="nol"/>}
                 title={data.envName}
              />
            </List.Item>
          )
        },
        renderExact: (selectData) => {
          return <Button type="primary" block onClick={()=>handleLastClick(selectData)}>查看全部环境日志</Button>
        },
        service: (selectData)=> {
          return fetchEnvList(selectData.app.projectId).then(res=>{
              return res.payload
          })
        }
      },
  ]

  const formatSlsUrl = (data) => {
    return `http://dev-cloud.vipthink.net/index.html#/log?app=${data.appName}&projectName=${data.slsProject}&logStoreName=${data.projectLogStore}&containerName=${data.containerName}&namespace=${data.namespace}`
  }
  const handleLastClick = async  (data) => {
       try {
         const { payload } = await getSlsLog(data?.app?.id, { envId: data?.env?.envId })
         const logUrl = formatSlsUrl({
           appName: data?.app?.name,
           ...payload,
         })
         window.open(logUrl, '_blank')
       } catch(e) {}
  }


  if (!isLogin) {
    return <LoginForm submit={submit} submitting={submitting} />;
  }

  return (
    <div>
      <Button onClick={reLogin}>退出登录</Button>
      <Button onClick={()=>ssref.current.open()}>点我</Button>
      <StepSelector
         ref={ssref}
         title="日志服务 SLS"
         subTitle="选择应用查看应用日志"
         storage={localStorage}
         steps={steps}
         onLastClick={handleLastClick}
         history={{
           storageKey: 'sls-log',
           maxCount: 10,
           renderItem: (data) => {
             return <Tag>{data?.app?.name}-{data?.env?.envName}</Tag>
           },
         }}
         selectedConfig={{
            key: 'id',
            separator: '>',
            renderItem: (data, stepKey) =>{
              return stepKey === 'app' ? <Tag>应用：{data.name}</Tag> : <Tag>环境：{data.envName}</Tag>
            }
         }}
         footer={
          <p style={{textAlign: 'left'}}>
            温馨提示：当前仅可查看已接入研发效能平台的应用日志(非生产环境)，其他应用日志请登录阿里云SLS控制台查看，<a href="#">前往查看>></a>
          </p>
         }
       />
    </div>
  )
}

```

## API

`SelectData`是当前选中的数据对象，`key`由 `steps` 中的每个 `stepKey` 构成

```ts
export type SelectData = Record<string, any>;
```

暴露出 `open` 方法, 用于打开弹窗

```ts
export type StepSelectorRef = {
  open: () => void;
};
```

```ts
export type StepSelectorProps = {
  // 弹窗标题
  title?: string;
  // 弹窗副标题
  subTitle?: string;
  // 每个步骤的配置
  steps: StepItem[];
  // 最后步骤点击之后的操作
  onLastClick?: (selectData: SelectData) => Promise<any>;
  // 弹窗底部
  footer?: ReactElement | null;
  // 已选择的配置， 设置false 不显示
  selectedConfig?: SelectedConfig;
  // 历史记录配置
  history: StepSelectorHistoryConfig;
};

export type StepItem = {
  // 标题
  title?: string;
  // 步骤标识，在SelectData的key
  stepKey: string;
  // 每个item的渲染
  renderItem: (data: Record<string, any>) => ReactElement<any>;
  // 数据源方法
  service: (selectData: SelectData) => Promise<any>;
  // 搜索表单配置，不设置则不展示，设置后参数会放入到service的参数
  searchFormSchema?: ProFormColumnsType[];
  // 分页配置，不设置则不展示，设置后参数会放入到service的参数
  pagination?: {
    size?: number;
  };
  // ant design 的 List 配置
  listProps?: Omit<ListProps<any>, 'data' | 'renderItem' | 'pagination'>;
};

export type SelectedConfig =
  | {
      // 分隔符
      separator: string;
      // 每个已选择item的渲染
      renderItem: (data: any, stepKey: string) => ReactElement | null;
    }
  | false;

// 历史记录都保存在 localStorage 中
export type StepSelectorHistoryConfig = {
  // localStorage 的 key
  storageKey: string;
  // 历史记录最大的存放数量
  maxCount: number;
  // 每个历史记录的渲染
  renderItem: (selectData: SelectData) => ReactElement | null;
};
```
