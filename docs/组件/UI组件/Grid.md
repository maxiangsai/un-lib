# Grid

## 网格组件

自动化等列布局, 根据子元素数量自动布局

## 基础使用

```tsx
import React from 'react';
import { Grid } from '@un/components';
export default () => {
  return (
    <div>
      <Grid gutter={20} col={3}>
        <div>子元素1</div>
        <div>子元素2</div>
        <div>子元素3</div>
      </Grid>
    </div>
  );
};
```

## 表单布局

```tsx
import React from 'react';
import { Grid } from '@un/components';
import { Form, Input, Button, Row } from 'antd';
export default () => {
  return (
    <Form>
      <Grid
        gutter={30}
        cellStyle={{ background: '#f1f1f1', padding: 20 }}
        col={2}
      >
        <Form.Item label="字段1">
          <Input />
        </Form.Item>
        <Form.Item label="字段2">
          <Input />
        </Form.Item>
      </Grid>
      <Grid
        gutter={30}
        cellStyle={{ background: '#f1f1f1', padding: 20 }}
        col={3}
      >
        <Form.Item label="字段3">
          <Input />
        </Form.Item>
        <Form.Item label="字段4">
          <Input />
        </Form.Item>
        <Form.Item label="字段5">
          <Input />
        </Form.Item>
      </Grid>
      <Form.Item>
        <Button type="primary" size="large" block>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
```

## 卡片列表

```tsx
import React from 'react';
import { Grid } from '@un/components';
import { Card, Button, Row, Input, Col, Space } from 'antd';

const projects = [
  {
    id: 'e814c475c9528935a457adc1de32da40',
    name: 'sh-jy',
    description: '上海教研项目组',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 3,
    frontEndCount: 0,
    businessLineId: 1,
  },
  {
    id: 'a67766e62aa35b8616fa44cd62dbb070',
    name: 'fe-awesome',
    description: '前端资源',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 0,
    frontEndCount: 1,
    businessLineId: 1,
  },
  {
    id: 'a0ff1fbba3f4b55f42c01264ec699609',
    name: 'gateway',
    description: 'API网关',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 5,
    frontEndCount: 2,
    businessLineId: 1,
  },
  {
    id: '2d8490e6de7b0305dc183b028507d3fd',
    name: 'test-project1',
    description: '测试工程',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 0,
    frontEndCount: 0,
    businessLineId: 1,
  },
  {
    id: '29516c2e8c8a21e4fa351c2662b545a4',
    name: 'tiger',
    description: 'tiger1',
    archived: false,
    tags: [],
    role: 'MANAGER',
    backEndCount: 12,
    frontEndCount: 9,
    businessLineId: 1,
  },
  {
    id: 'cec8d4858b1ee755e546a1b8dd0b61b4',
    name: 'superfly',
    description: '小飞侠工程',
    archived: false,
    tags: [],
    role: 'MANAGER',
    backEndCount: 6,
    frontEndCount: 1,
    businessLineId: 1,
  },
  {
    id: '9a9075befe38d76dfbc253d884076952',
    name: 'shanghai-demo',
    description: '上海研发团队测试工程',
    archived: false,
    tags: [],
    role: 'MANAGER',
    backEndCount: 3,
    frontEndCount: 0,
    businessLineId: 1,
  },
  {
    id: 'a449455e93a373c025f45483cc9af98e',
    name: 'vipthinkcode-base',
    description: '豌豆编程基础',
    archived: false,
    tags: [
      {
        id: 1112,
        name: '豌豆编程',
        createdAt: '2021-03-29T07:01:56.000+0000',
      },
    ],
    role: 'GENERAL',
    backEndCount: 10,
    frontEndCount: 5,
    businessLineId: 1,
  },
  {
    id: '3f8891223e8438d46062bf95c0ce5528',
    name: 'example',
    description: '范例工程',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 8,
    frontEndCount: 6,
    businessLineId: 1,
  },
  {
    id: 'ff44ee7000e2b7e3c99701226da46cf3',
    name: 'cloud',
    description: '豌豆云-技术中台',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 5,
    frontEndCount: 9,
    businessLineId: 1,
  },
  {
    id: '0fb796429e9c6563da27c56f88622d5f',
    name: 'demo',
    description: 'demo',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 0,
    frontEndCount: 0,
    businessLineId: 1,
  },
  {
    id: '92606c705ea14d881102676aa3b835a3',
    name: 'unify-monitor',
    description: '统一监控平台',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 7,
    frontEndCount: 1,
    businessLineId: 1,
  },
  {
    id: 'f5914d324ccce10c72dd9a3b438bcecd',
    name: 'lihai-test3',
    description: 'lihai-test3',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 0,
    frontEndCount: 1,
    businessLineId: 1,
  },
  {
    id: 'e47fec2c9bc34278c7fc4939ddaec206',
    name: 'lihai-tester2',
    description: 'lihai-tester2',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 6,
    frontEndCount: 0,
    businessLineId: 1,
  },
  {
    id: '4a5781320d9ec49b2895605527721d66',
    name: 'open-platform',
    description: '开放平台',
    archived: false,
    tags: [],
    role: 'OWNER',
    backEndCount: 2,
    frontEndCount: 0,
    businessLineId: 1,
  },
];
export default () => {
  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Input.Search placeholder="请输入工程名称" />
        </Col>
        <Col span={5} style={{ textAlign: 'right' }}>
          <Space>
            <Button type="primary">申请工程</Button>
            <Button>申请记录</Button>
          </Space>
        </Col>
      </Row>
      <Grid gutter={20} col={5}>
        {projects.map((project) => {
          return (
            <Card
              key={project.id}
              actions={[
                <Button type="link">发版</Button>,
                <Button type="link">看日志</Button>,
              ]}
            >
              <Card.Meta
                title={project.name}
                description={project.description}
              />
            </Card>
          );
        })}
      </Grid>
    </div>
  );
};
```

## API

```ts
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
```
