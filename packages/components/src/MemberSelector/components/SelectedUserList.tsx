import React, { memo } from 'react';

import type { AssertService } from '../../service/types';
import Pane from './Pane';
import { Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Props {
  data: AssertService.ProjectMember[];
  onDelete: (value: AssertService.ProjectMember) => void;
}

const SelectedUserList = (props: Props) => {
  return (
    <Pane title={`已选择用户(${props.data.length})`}>
      <div className="xt-selected-user-list">
        {props.data.map((item) => {
          return (
            <Tag
              closable
              onClose={() => props.onDelete(item)}
              style={{ marginBottom: 5 }}
              color="#50c8b9"
              key={item.id}
              icon={<UserOutlined />}
            >
              {item.username}
              {/* <Space>

                <span style={{ fontSize: 12 }}>
                  (工号：{item.empNo || '暂无工号'})
                </span>
              </Space> */}
            </Tag>
          );
        })}
      </div>
    </Pane>
  );
};

export default memo(SelectedUserList);
