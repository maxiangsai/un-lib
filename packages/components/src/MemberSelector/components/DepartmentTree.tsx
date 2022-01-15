/* eslint-disable no-nested-ternary */
import React, { memo } from 'react';

import { Input, Spin, Tree } from 'antd';
import DepartmentSearchResult from './DepartmentSearchResult';
import Pane from './Pane';

import type { TreeProps } from 'antd/lib/tree';
import type { Key } from 'react';
import type { AssertService } from '../../service/types';

interface Props extends Required<Pick<TreeProps, 'loadData' | 'treeData'>> {
  onSelect: (data: Key[]) => void;
  searchHandle: (value: string) => void;
  loading: boolean;
  isSearch: boolean;
  searchData?: AssertService.IDept[];
  searching: boolean;
}

const DepartmentTree = (props: Props) => {
  const {
    treeData,
    loadData,
    searchHandle,
    onSelect,
    loading,
    isSearch,
    searchData,
    searching,
  } = props;

  return (
    <Pane title="部门">
      <div className="xt-member-selector-depart-tree">
        <Input.Search
          placeholder="请输入部门名称，按回车搜索"
          onSearch={searchHandle}
        />

        <div className="xt-member-selector-depart-tree__content">
          {loading ? (
            <Spin
              className="xt-member-selector-depart-tree__loading"
              tip="正在加载部门数据"
            />
          ) : isSearch ? (
            <DepartmentSearchResult
              searching={searching}
              onClick={(data) => onSelect([data.id])}
              data={searchData as AssertService.IDept[]}
            />
          ) : (
            <Tree
              showLine
              onSelect={onSelect}
              treeData={treeData}
              loadData={loadData}
            />
          )}
        </div>
      </div>
    </Pane>
  );
};

export default memo(DepartmentTree);
