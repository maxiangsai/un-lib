# Header

## 通用头部组件

通用头部组件

## 基础使用

```tsx
import React from 'react';
import { Header } from '@un/components';

export default () => {
  return <Header username="lihai" />;
};
```

## 左边插槽

```tsx
import React from 'react';
import { Header } from '@un/components';

export default () => {
  const LeftNode = <div style={{ color: '#fff' }}>Hello world!</div>;
  return <Header username="lihai" leftNode={LeftNode} />;
};
```

## 右边插槽

```tsx
import React from 'react';
import { Header } from '@un/components';
export default () => {
  const RightNode = <div style={{ color: '#fff' }}>Hello world!</div>;
  return <Header username="lihai" rightNode={RightNode} />;
};
```

## 自定义下拉菜单

```tsx
import React from 'react';
import { Header } from '@un/components';
export default () => {
  const RightNode = <div style={{ color: '#fff' }}>Hello world!</div>;

  const customDropdownList = [
    {
      text: '忘记密码',
      handle: () => {
        alert('点我');
      },
    },
  ];

  return <Header username="lihai" dropdownList={customDropdownList} />;
};
```

## 自定义 Logo

```tsx
import React from 'react';
import { Header } from '@un/components';
export default () => {
  const LogoImage = (
    <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" />
  );
  return (
    <Header
      username="lihai"
      logoLink="https://www.baidu.com"
      logoImage={LogoImage}
    />
  );
};
```

## 自定义 LogoTooltip

```tsx
import React from 'react';
import { Header } from '@un/components';
export default () => {
  return (
    <Header
      username="lihai"
      logoLink="https://www.baidu.com"
      logoTooltip="我是tooltip"
    />
  );
};
```
