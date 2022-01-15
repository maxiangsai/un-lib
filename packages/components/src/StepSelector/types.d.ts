import type { ReactElement } from 'react';
import type { ListProps } from 'antd';
import type { ProFormColumnsType } from '@ant-design/pro-form';

export type SelectData = Record<string, any>;
export type StepItem = {
  title?: string;
  stepKey: string;
  renderItem: (data: Record<string, any>) => ReactElement<any>;
  service: (selectData: SelectData) => Promise<any>;
  searchFormSchema?: ProFormColumnsType[];
  pagination?: {
    size?: number;
  };
  renderExact?: (selectData: SelectData) => ReactElement;
  listProps?: Omit<ListProps<any>, 'data' | 'renderItem' | 'pagination'>;
};

export type SelectedConfig =
  | {
      separator: string;
      renderItem: (data: any, stepKey: string) => ReactElement | null;
    }
  | false;

export type StepSelectorHistoryConfig = {
  storageKey: string;
  maxCount: number;
  renderItem: (selectData: SelectData) => ReactElement | null;
};
