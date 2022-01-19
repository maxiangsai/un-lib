import { Form, List, Row, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { SelectData, StepItem } from './types';

import { BetaSchemaForm } from '@ant-design/pro-form';
import type { CommonProps } from '../typings';
import { LeftOutlined } from '@ant-design/icons';
import type { ListProps } from 'antd';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { useRequest } from 'ahooks';

export type StepItemPaneProps = CommonProps &
  StepItem & {
    onClickItem: (data: any) => void;
    selectData: SelectData;
    showBack: boolean;
    onBack?: () => void;
  };

const StepItemPane = ({
  showBack,
  searchFormSchema,
  selectData,
  pagination,
  listProps,
  title,
  service,
  onBack,
  renderItem,
  onClickItem,
  renderExact,
}: StepItemPaneProps) => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState({});
  const [form] = Form.useForm();
  const { loading, data } = useRequest(
    () => {
      let params: Record<string, any> = {};
      if (pagination) {
        params = { page, ...selectData, size: pagination.size };
      } else {
        params = selectData;
      }

      if (searchFormSchema && searchFormSchema.length > 0) {
        params = {
          ...params,
          ...searchValue,
        };
      }

      return service(params).then((res) => {
        if (pagination) {
          setTotal(res.total);
          return res.data;
        }
        return res;
      });
    },
    {
      refreshDeps: [page, selectData, service, searchValue],
    },
  );

  useEffect(() => () => setPage(1), []);

  const listPaginationProps: ListProps<any>['pagination'] = useMemo(() => {
    if (pagination) {
      return {
        pageSize: pagination.size,
        total,
        current: page,
        showSizeChanger: false,
        showTotal: (t) => `共计： ${t} 条记录`,
        onChange: (v: number) => {
          setPage(v);
        },
      };
    }
    return false;
  }, [pagination, total, page]);

  const search = useCallback(() => {
    setPage(1);
    setSearchValue(form.getFieldsValue());
  }, [form]);

  const formSchema: ProFormColumnsType[] = useMemo(() => {
    if (!searchFormSchema) return [];
    return searchFormSchema.map((item) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      item.fieldProps.onKeyDown = (e) => {
        if (e.keyCode === 13) {
          search();
        }
      };

      return item;
    });
  }, [searchFormSchema, search]);

  if (loading) {
    return (
      <Row justify="center" style={{ padding: 100 }}>
        <Spin tip="正在寻找星辰大海...." />
      </Row>
    );
  }

  return (
    <div className="unicom-step-selector__step-item-pane">
      <div className="unicom-step-selector__step-item-pane--head">
        {showBack && (
          <div
            className="unicom-step-selector__step-item-pane--back"
            onClick={onBack}
          >
            <LeftOutlined />
            返回
          </div>
        )}
        <span className="unicom-step-selector__step-item-pane--title">
          请选择{title}
        </span>
      </div>
      {formSchema && formSchema.length > 0 && (
        <div className="unicom-step-selector__search-form">
          <BetaSchemaForm
            layout="inline"
            columns={formSchema}
            form={form}
            submitter={{
              render: () => null,
            }}
          />
        </div>
      )}
      <List
        {...listProps}
        pagination={listPaginationProps}
        dataSource={data}
        renderItem={(item: any) => {
          return (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => onClickItem(item)}
            >
              {renderItem(item)}
            </div>
          );
        }}
      />
      {renderExact && renderExact(selectData)}
    </div>
  );
};

StepItemPane.defaultProps = {
  pagination: null,
};

export default StepItemPane;
