import React, { useState, useMemo } from 'react';
import { Button, Alert, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRequest } from 'ahooks';
// IAM 相关信息
const IAM_HOST = 'https://dev-auth-new.vipthink.cn';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [uid, setUid] = useState(
    parseInt(localStorage.getItem('uid') || '0', 10) || 0,
  );
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
          // eslint-disable-next-line @typescript-eslint/no-shadow
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

export const LoginForm = ({ submit, submitting }: any) => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}
    >
      <Form onFinish={submit} style={{ width: '500px' }} size="large">
        <Alert
          style={{ marginBottom: '30px' }}
          type="info"
          // @ts-ignore
          title="提示"
          message="因成员选择器组件需要用到devops的业务接口，所以这里需要用户token，这里模拟iam的登录，点击登录按钮"
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
