/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import { Empty, Spin } from 'antd';

import type { AssertService } from '../../service/types';

interface Props {
  data: AssertService.IDept[];
  onClick?: (e: AssertService.IDept) => void;
  searching: boolean;
}

const DepartmentSearchResult = (props: Props) => {
  const { data, searching, onClick } = props;

  const clickHandle = useCallback(
    (dept: AssertService.IDept) => {
      onClick?.(dept);
    },
    [onClick],
  );

  return (
    <div className="xt-department-search-result">
      {searching ? (
        <Spin
          className="xt-department-search-result__searching"
          spinning={searching}
          tip="正在搜索中"
        />
      ) : !data.length ? (
        <Empty
          className="xt-department-search-result__not-data"
          description="暂无部门数据"
        />
      ) : (
        <ul className="xt-department-search-result__list">
          {data.map((item) => {
            return (
              <li key={item.id} onClick={() => clickHandle(item)}>
                {item.departName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DepartmentSearchResult;
