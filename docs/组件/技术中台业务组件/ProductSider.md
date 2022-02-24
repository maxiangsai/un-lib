# ProductSider

## 技术中台侧边栏

技术中台通用侧边栏菜单

## 基础使用

```tsx
import React, { useState, useMemo, useRef } from 'react';
import { ProductSider } from '@unicom/components';
import { Button, Alert, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRequest } from 'ahooks';
import { useAuth, LoginForm } from '../../../packages/hooks/src/demo/useAuth';

const DEVOPS_HOST = 'http://dev-devops.vipthink.net';

// const PARSE_APP_ID = 'c5YAGKnaBo';
// const PARSE_SERVER = 'http://172.18.108.181:1337/parse';
// const userId = 225400;
const projectList = [
  {
    id: 'a67766e62aa35b8616fa44cd62dbb070',
    name: 'fe-awesome',
    description: '前端资源',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 0,
    frontEndCount: 1,
  },
  {
    id: 'a0ff1fbba3f4b55f42c01264ec699609',
    name: 'gateway',
    description: 'API网关',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 2,
    frontEndCount: 1,
  },
  {
    id: '2d8490e6de7b0305dc183b028507d3fd',
    name: 'test-project1',
    description: '测试项目',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 0,
    frontEndCount: 0,
  },
  {
    id: '29516c2e8c8a21e4fa351c2662b545a4',
    name: 'tiger',
    description: 'tiger',
    archived: false,
    tags: [],
    role: 'MANAGER',
    backEndCount: 4,
    frontEndCount: 3,
  },
  {
    id: 'cec8d4858b1ee755e546a1b8dd0b61b4',
    name: 'superfly',
    description: '小飞侠项目',
    archived: false,
    tags: [],
    role: 'MANAGER',
    backEndCount: 5,
    frontEndCount: 1,
  },
  {
    id: '9a9075befe38d76dfbc253d884076952',
    name: 'shanghai-demo',
    description: '上海研发团队测试项目',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 3,
    frontEndCounnt: 0,
  },
];

export default () => {
  const { submit, uid, isLogin, token, submitting, reLogin } = useAuth();

  if (!isLogin) {
    return <LoginForm submit={submit} submitting={submitting} />;
  }

  return (
    <ProductSider
      devopsHost={DEVOPS_HOST}
      token={token}
      // parseAppId={PARSE_APP_ID}
      // parseServer={PARSE_SERVER}
      projectList={projectList}
    />
  );
};
```

## 手动展开

```tsx
import React from 'react';
import { Layout, Button } from 'antd';
import { ProductSider } from '@unicom/components';
import { useAuth, LoginForm } from '../../../packages/hooks/src/demo/useAuth';

const DEVOPS_HOST = 'http://dev-devops.vipthink.net';
export default () => {
  const { submit, uid, isLogin, token, submitting, reLogin } = useAuth();

  if (!isLogin) {
    return <LoginForm submit={submit} submitting={submitting} />;
  }

  const ref = React.useRef({});
  const open = () => ref.current.open();
  const close = () => ref.current.close();
  return (
    <Layout>
      <ProductSider
        devopsHost={DEVOPS_HOST}
        token={token}
        // userId={userId}
        // parseAppId={PARSE_APP_ID}
        // parseServer={PARSE_SERVER}
        productSiderRef={ref}
      />
      <Layout.Content>
        <Button onClick={open}>打开</Button>
        <Button onClick={close}>关闭</Button>
      </Layout.Content>
    </Layout>
  );
};
```

## 订阅事件

```tsx
import React from 'react';
import { Layout, Button } from 'antd';
import { ProductSider } from '@unicom/components';
import { useAuth, LoginForm } from '../../../packages/hooks/src/demo/useAuth';

const DEVOPS_HOST = 'http://dev-devops.vipthink.net';
export default () => {
  const { submit, uid, isLogin, token, submitting, reLogin } = useAuth();

  if (!isLogin) {
    return <LoginForm submit={submit} submitting={submitting} />;
  }

  const ref = React.useRef({});
  const open = () => ref.current.open();
  const close = () => ref.current.close();
  const change = (product) => {
    if (product.isCancel) {
      alert('取消订阅' + product.name);
    } else {
      alert('订阅' + product.name);
    }
  };
  return (
    <Layout>
      <ProductSider
        onSubscribeChange={change}
        devopsHost={DEVOPS_HOST}
        token={token}
        // userId={userId}
        // parseAppId={PARSE_APP_ID}
        // parseServer={PARSE_SERVER}
        productSiderRef={ref}
      />
    </Layout>
  );
};
```

## 获取状态

```tsx
import React from 'react';
import { Layout, Button } from 'antd';
import { ProductSider } from '@unicom/components';
import { useAuth, LoginForm } from '../../../packages/hooks/src/demo/useAuth';

const DEVOPS_HOST = 'http://dev-devops.vipthink.net';
export default () => {
  const { submit, uid, isLogin, token, submitting, reLogin } = useAuth();

  if (!isLogin) {
    return <LoginForm submit={submit} submitting={submitting} />;
  }

  const ref = React.useRef({});
  const clickhandle = () => {
    if (ref.current) {
      const { collapsed, showMask } = ref.current.getState();
      alert(`侧边栏折叠状态：${collapsed}, 全部产品打开状态: ${showMask}`);
    }
  };
  return (
    <Layout>
      <ProductSider
        // userId={userId}
        // parseAppId={PARSE_APP_ID}
        // parseServer={PARSE_SERVER}
        devopsHost={DEVOPS_HOST}
        token={token}
        productSiderRef={ref}
      />
      <Button onClick={clickhandle}>点我获取当前状态</Button>
    </Layout>
  );
};
```

## 固定位置

```tsx
/**
 * iframe: 1000
 */
import React from 'react';
import { Layout, Button, Menu, message } from 'antd';
import { ProductSider, Header } from '@unicom/components';
import { useAuth, LoginForm } from '../../../packages/hooks/src/demo/useAuth';

const DEVOPS_HOST = 'http://dev-devops.vipthink.net';
export default () => {
  const { submit, uid, isLogin, token, submitting, reLogin } = useAuth();

  if (!isLogin) {
    return <LoginForm submit={submit} submitting={submitting} />;
  }

  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <Header username="李海" />
      <Layout>
        <ProductSider
          // parseAppId={PARSE_APP_ID}
          // parseServer={PARSE_SERVER}
          devopsHost={DEVOPS_HOST}
          token={token}
          onClickProduct={(product) => {
            if (product.name === '日志服务（SLS）') {
              message.success(`点击了${product.name}`);
            }
          }}
          fixed={{
            headerHeight: 60,
            zIndex: 99,
          }}
        />
        <Layout style={{ paddingLeft: 48 }}>
          <Layout.Sider theme="light" collapsedWidth={48}>
            <Menu theme="light" collapsedWidth={48}>
              <Menu.Item>哈哈哈</Menu.Item>
              <Menu.Item>哈哈哈</Menu.Item>
              <Menu.Item>哈哈哈</Menu.Item>
              <Menu.Item>哈哈哈</Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content>就ADSL看见啊封锁科技</Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
```

<!-- <API exports='["ProductSiderRef"]'></API> -->

## API

<table>
  <thead>
    <tr>
      <th width="100">名称</th>
      <th width="600">描述</th>
      <th >类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>devopsHost</td>
      <td>研发效能平台地址</td>
      <td><code>string</code></td>
      <td>必须</td>
    </tr>
      <tr>
      <td>token</td>
      <td>iam的登录token</td>
      <td><code>string</code></td>
      <td>必须</td>
    </tr>
    <!-- <tr>
      <td>userId</td>
      <td>IAM的用户ID</td>
      <td><code>string</code> | <code>number</code></td>
      <td>必须属性</td>
    </tr> -->
    <tr>
      <td>productSiderRef</td>
      <td>暴露ref对象，提供open、close、getState 方法</td>
      <td><code>ProductSiderRef</code></td>
      <td>无</td>
    </tr>
    <tr>
      <td>projectList</td>
      <td>DevOps的项目列表</td>
      <td><code>ProjectModel[]</code></td>
      <td>无</td>
    </tr>
    <tr>
      <td>onSubscribeChange</td>
      <td>当订阅或取消订阅产品触发,参数为产品信息，<code>isCancel</code>表示触发的类型，如果是true则是取消订阅操作，false为订阅操作</td>
      <td><code>(product?:ProductVO) => void</code></td>
      <td>无</td>
    </tr>
    <tr>
      <td>onClickProduct</td>
      <td>如果产品数据有 <code>isPrecise</code>，则会优先执行 该事件，覆盖默认跳转操作</td>
      <td><code>(product?:ProductVO) => void</code></td>
      <td>无</td>
    </tr>
  </tbody>
</table>

<!-- ## 技术中台 Parse 各环境地址

### dev 环境

```shell
PARSE_APP_ID=c5YAGKnaBo
PARSE_SERVER=http://172.18.108.181:1337/parse
```

### uat 环境

```shell
PARSE_APP_ID=c5YAGKnaBo
PARSE_SERVER=http://172.18.178.196:1337/parse
```

### 生产环境

```shell
PARSE_APP_ID=c5YAGKnaBo
PARSE_SERVER=http://39.108.131.95:13370/parse
``` -->
