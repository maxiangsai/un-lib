import {
  Checkbox,
  Empty,
  Input,
  Pagination,
  Row,
  Space,
  Spin,
  Tooltip,
} from 'antd';
/* eslint-disable no-nested-ternary */
import React, { Fragment, memo } from 'react';

import type { AssertService } from '../../service/types';
import type { CheckboxValueType } from 'antd/lib/checkbox/Group';
import type { PaginationProps } from 'antd';
import Pane from './Pane';
import { useControllableValue } from 'ahooks';

const style = {
  fontSize: '12px',
};

const itemRender: PaginationProps['itemRender'] = (_, type) => {
  if (type === 'prev') return <a style={style}>上一页</a>;
  if (type === 'next') return <a style={style}>下一页</a>;
  return null;
};

interface Props {
  memberList: AssertService.ProjectMember[];
  total: number;
  allCheck: boolean;
  indeterminate: boolean;
  loading: boolean;
  page: number;
  value: number[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchHandle: (value: string) => void;
  pageChange: (page: number) => void;
  onChange: (value: number[]) => void;
  onCheckAllChange: (v: boolean) => void;
}

const MemberList = ({
  allCheck,
  indeterminate,
  total,
  memberList,
  page,
  loading,
  searchHandle,
  searchValue,
  setSearchValue,
  pageChange,
  onCheckAllChange,
  ...props
}: Props) => {
  const [state, setState] = useControllableValue(props);
  const changeHandle = (value: CheckboxValueType[]) => {
    setState(value);
  };
  return (
    <Pane
      title={
        <Checkbox
          checked={allCheck}
          indeterminate={indeterminate}
          onChange={(e) => onCheckAllChange(e.target.checked)}
          className="unicom-project-member-list__title"
        >
          用户列表({total})
        </Checkbox>
      }
    >
      <div className="unicom-project-member-list">
        <Input.Search
          value={searchValue}
          placeholder="支持姓名、昵称、工号、手机号码、邮箱、用户ID搜索"
          onSearch={searchHandle}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="unicom-project-member-list-content">
          {loading ? (
            <Spin
              className="unicom-project-member-list-content__searching"
              spinning={loading}
              tip="正在加载用户数据..."
            />
          ) : memberList.length ? (
            <Fragment>
              <Checkbox.Group value={state} onChange={changeHandle}>
                {memberList.map((member) => {
                  const memberCheckbox = (
                    <Checkbox
                      value={member.id}
                      checked={member.projectMember}
                      disabled={member.projectMember}
                    >
                      <Space>
                        {member.username}
                        <span style={{ color: '#d9d9d9', fontSize: 12 }}>
                          (工号：{member.empNo || '暂无工号'})
                        </span>
                      </Space>
                    </Checkbox>
                  );
                  return (
                    <Row key={member.id}>
                      {member.projectMember ? (
                        <Tooltip title="已在工程成员中">
                          {memberCheckbox}
                        </Tooltip>
                      ) : (
                        memberCheckbox
                      )}
                    </Row>
                  );
                })}
              </Checkbox.Group>
              <Pagination
                total={total}
                current={page}
                className="unicom-project-member-list__pager"
                simple
                itemRender={itemRender}
                onChange={pageChange}
              />
            </Fragment>
          ) : (
            <Empty description="暂无用户数据" />
          )}
        </div>
      </div>
    </Pane>
  );
};

export default memo(MemberList);
