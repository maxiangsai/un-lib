# MemberSelector

## 成员选择器

员工成员选择器

## 基础使用

```tsx
import React, { useState, useMemo, useRef } from 'react';
import { Button, Alert, Form, Input, message } from 'antd';
import { MemberSelector } from '@xt/components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRequest } from 'ahooks';

// IAM 相关信息
const IAM_HOST = 'https://dev-auth-new.vipthink.cn';
// DEVOPS 信息
const DEVOPS_HOST = 'http://dev-devops.vipthink.net';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [uid, setUid] = useState(parseInt(localStorage.getItem('uid')) || 0);
  const { run, loading } = useRequest(
    (data: { account: string; password: string }) =>
      axios.post(`${IAM_HOST}/v1/auth/admin/token`, {
        account: data.account,
        password: data.password,
      }),
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data.code === 0) {
          const { token, uid } = res.data.data;
          localStorage.setItem('token', token);
          localStorage.setItem('uid', uid);
          setToken(token);
          setUid(uid);
        } else {
          message.error(res.data.info);
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
          message="因成员选择器组件需要用到devops的业务接口，所以这里需要用户tokne，这里模拟iam的登录，点击登录按钮"
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

export default () => {
  const { submit, uid, isLogin, token, submitting, reLogin } = useAuth();
  const ref = useRef(null);
  const confirmHandle = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const names = data.map((item) => item.username).join(',');
        message.info('选择了' + names);
        resolve(true);
      }, 3000);
    });
  };

  if (!isLogin) {
    return <LoginForm submit={submit} submitting={submitting} />;
  }

  return (
    <div style={{ margin: '20px' }}>
      <Button onClick={reLogin}>退出登录</Button>
      <Button onClick={() => ref.current.open()}>点我打开弹窗选择器</Button>
      <MemberSelector
        devopsHost={DEVOPS_HOST}
        token={token}
        userId={uid}
        projectId="ac3127d85a114025a36482aad563c1c7"
        ref={ref}
        onConfirm={confirmHandle}
      />
    </div>
  );
};
```

## API

### `Props`

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
    <tr>
      <td>userId</td>
      <td>IAM的用户ID</td>
      <td><code>string</code> | <code>number</code></td>
      <td>必须</td>
    </tr>
    <tr>
      <td>projectId</td>
      <td>研发效能平台的工程id，不传默认是申请模式，填写了了是排除已加入工程的成员</td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td>onConfirm</td>
      <td>
      <div>确定按钮的回调，不传只会关闭弹窗</div>
        <div>参数是已选的成员列表。必须返回<code>Promise</code>，<code>true</code>关闭弹窗，<code>false</code>不做操作</div></td>
      <td><code>(data: AssertService.ProjectMember[]) => Promise&lt;boolean&gt;</code></td>
      <td>
        -
      </td>
    </tr>
    <tr>
      <td>onClose</td>
      <td>取消按钮的回调，即关闭弹窗后执行</td>
      <td><code>() => void</code></td>
      <td>-</td>
    </tr>
  </tbody>
</table>

## 方法

传入 ref 可以获取实例对象

```ts
const ref = useRef();
return (
  <div>
    <button onClick={() => ref.current.open()}>打开</button>
    <MemberSelector ref={ref} />
    <button onClick={() => ref.current.close()}>关闭</button>
  </div>
);
```

ref 方法

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>open</td>
      <td>打开弹窗</td>
    </tr>
    <tr>
      <td>close</td>
      <td>关闭弹窗</td>
    </tr>
  </tbody>
</table>

## 研发效能平台各环境地址

### dev 环境

```shell
DEVOPS_HOST=http://dev-devops.vipthink.net
```

### uat 环境

```shell
DEVOPS_HOST=http://qa-devops.vipthink.net
```

### 生产环境

```shell
DEVOPS_HOST=http://devops.vipthink.net
```
