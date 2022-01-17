# BreadcrumbPlus

## 加强版面包屑组件

读取配置、当前路由、匹配数据自动识别面包屑，配置是基于`umi`路由配置的树状结构，增加了配置

## 基础使用

```tsx
import React, { useState, useMemo } from 'react';
import { BreadcrumbPlus } from '@unicom/components';
import {
  message,
  Button,
  List,
  Alert,
  Col,
  Typography,
  Row,
  Space,
} from 'antd';
const config = [
  {
    breadTitle: '工程管理',
    path: '/project',
    routes: [
      { path: '/project/list', breadTitle: '工程列表' },
      {
        path: '/project/:projectId',
        breadTitle: '{{ projectId }}',
        hasClick: true,
        routes: [
          {
            path: '/project/:projectId/appList',
            breadTitle: '应用管理',
          },
          {
            path: '/project/:projectId/appList/:appId',
            breadTitle: '应用详情 / {{ appId }}',
            routes: [
              {
                path: '/project/:projectId/appList/:appId/route',
                breadTitle: '应用路由',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    breadTitle: '环境管理',
    path: '/env',
    routes: [
      { path: '/env/:envId', breadTitle: '环境详情' },
      { path: '/env/:envId/runtime-instance', breadTitle: '环境运行实例' },
    ],
  },
];
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
  const [project, setProject] = useState(projects[0]);
  const [curRoute, setCurRoute] = useState(() => {
    return `/project/${project.id}/appList`;
  });

  const matchData = useMemo(() => {
    return {
      projectId: { text: project.description, value: project.id },
    };
  }, [project]);
  const clickHandle = (value) => {
    message.success(
      `点击了: ${value.title}, 链接为：${value.path}, 使用  react 的 useLocation 跳转吧`,
    );
  };
  const chooseProject = (project) => {
    setProject(project);
    setCurRoute(`/project/${project.id}/appList`);
  };

  return (
    <>
      <Row justify="center" style={{ marginBottom: 20 }}>
        <BreadcrumbPlus
          style={{
            boxShadow: '0 0 10px rgba(0,0,0,.25)',
            width: '100%',
            padding: 20,
          }}
          itemClass="item"
          clickClass="has-click"
          curRoute={curRoute}
          routeConfig={config}
          matchData={matchData}
          onClickItem={clickHandle}
          antBreadcrumbProps={{
            separator: '/',
          }}
        />
      </Row>
      <Row gutter={24} justify="center">
        <Col span={12}>
          <Space direction="vertical" size={20}>
            <Alert message="当前路由" type="info" description={curRoute} />
            <div>
              <Typography.Title level={4}>当前匹配参数</Typography.Title>
              <pre
                style={{
                  background: '#eee',
                  border: '1px solid #aeaeae',
                  padding: 20,
                }}
              >
                {JSON.stringify(matchData, null, 2)}
              </pre>
            </div>
          </Space>
        </Col>
        <Col span={12}>
          <List
            dataSource={projects}
            size="small"
            renderItem={(item) => {
              return (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => chooseProject(item)}
                      ghost
                      size="small"
                    >
                      点我切换路由
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={<>{item.name}</>}
                    description={item.description}
                  />
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </>
  );
};
```

## 配置

```ts
export interface BreadcrumbPlusItem {
  // 路由url，必须是绝对路径
  path: string;
  // 标题，用于面包屑展示的文案，支持模板替换，example: {{projectId}}
  breadTitle: string;
  // 子路由
  children?: BreadcrumbPlusItem[];
  // 子路由
  routes?: BreadcrumbPlusItem[];
  // 是否可点击
  hasClick?: boolean;
  // 其余参数，做个冗余
  [key: string]: any;
}
```

`children` 和 `routes` 都是代表子路由, 如果共用`children`优先级高于 `routes`

配置示例

```json
[
  {
    "breadTitle": "工程管理",
    "path": "/project",
    "routes": [
      { "path": "/project/list", "breadTitle": "工程列表" },
      {
        "path": "/project/:projectId",
        "breadTitle": "{{projectId}}",
        "hasClick": true,
        "routes": [
          {
            "path": "/project/:projectId/appList",
            "breadTitle": "应用管理"
          },
          {
            "path": "/project/:projectId/appList/:appId",
            "breadTitle": "应用详情 / {{appId}}",
            "routes": [
              {
                "path": "/project/:projectId/appList/:appId/route",
                "breadTitle": "应用路由"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "breadTitle": "环境管理",
    "path": "/env",
    "routes": [
      { "path": "/env/:envId", "breadTitle": "环境详情" },
      { "path": "/env/:envId/runtime-instance", "breadTitle": "环境运行实例" }
    ]
  }
]
```

匹配数据

```ts
export type MatchData = {
  [key: string]: {
    text: string;
    value: string;
  };
};

// example:
const matchData: MatchData = {
  projectId: { text: '交易域', value: 'jaksldkfjasd' },
  appId: { text: '结算中心', value: 'adjlfaskdkfljasdf' },
};
```

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
      <td>curRoute</td>
      <td>当前路由地址，通过 <code>react-router-dom</code> 的 <code>useLocation</code> 可以获取 <a href="https://reactrouter.com/web/api/Hooks/uselocation">查看</a></td>
      <td><code>string</code></td>
      <td>必须</td>
    </tr>
      <tr>
      <td>routeConfig</td>
      <td>路由配置，<a href="#配置">查看</a></td>
      <td><code>BreadcrumbPlusItem[]</code></td>
      <td>必须</td>
    </tr>
    <tr>
      <td>matchData</td>
      <td>匹配的数据</td>
      <td><code>string</code> | <code>number</code></td>
      <td>必须</td>
    </tr>
     <tr>
      <td>itemClass</td>
      <td>面包屑item的类名</td>
      <td><code>string</code></td>
      <td>非必须</td>
    </tr>
      <tr>
      <td>clickClass</td>
      <td>可点击面包屑item的类名。和<code>itemClass共存</code></td>
      <td><code>string</code></td>
      <td>非必须</td>
    </tr>
    <tr>
      <td>antBreadcrumbProps</td>
      <td>ant design 的面包屑配置 <a href="https://ant.design/components/breadcrumb-cn/#API">查看</a></td>
      <td><code>MatchData</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td>onClickItem</td>
      <td>点击回调</td>
      <td><code>(data: BreadcrumbPlusItem) =>void</code></td>
      <td>
        -
      </td>
    </tr>
  </tbody>
</table>
