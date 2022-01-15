import { defineConfig } from 'dumi';

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = isProduction ? process.env.PUBLIC_PATH || '/' : '/';

export default defineConfig({
  title: 'un-lib',
  mode: 'site',
  publicPath,
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  history: {
    type: 'hash',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  navs: [
    null,
    {
      title: 'GitLab',
      path: 'https://gz-gitlab.vipthink.cn/fe-awesome/un-lib',
    },
  ],
  theme: {
    '@primary-color': '#50c8b9',
    '@link-color': '#50c8b9',
    '@success-color': '#52c41a',
    '@warning-color': '#faad14',
    '@error-color': '#f5222d',
    '@font-size-base': '14px',
    '@heading-color': 'rgba(0, 0, 0, 0.85)',
    '@text-color': 'rgba(0, 0, 0, 0.65)',
    '@text-color-secondary': 'rgba(0, 0, 0, 0.45);',
    '@disabled-color': 'rgba(0, 0, 0, 0.25)',
    '@border-radius-base': '2px',
    '@border-color-base': '#d9d9d9',
    '@box-shadow-base':
      '0 3px 6px - 4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    '@bg-color': '#f0f0f0',
    '@plain-grey': 'rgba(235, 236, 237, 0.3)',
    '@space': '20px',
    '@header-height': '60px',
    '@footer-height': '40px',
  },
});
