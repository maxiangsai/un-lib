import React, { useState, forwardRef, useImperativeHandle } from 'react';

import { Modal } from 'antd';
import { useFloatLayer } from '@unicom/hooks';

import Core from './Core';
import type { AssertService } from '../service/types';

import './index.less';

export type ProjectMember = AssertService.ProjectMember;
export type ProjectMemberList = ProjectMember[];
export interface MemberSelectorProps {
  devopsHost: string;
  token: string;
  userId: number;
  projectId?: string;
  onConfirm?: (data: AssertService.ProjectMember[]) => Promise<boolean>;
  onClose?: () => void;
}

export interface MemberSelectorRef {
  open: () => void;
  close: () => void;
}

const MemberSelector = forwardRef<MemberSelectorRef, MemberSelectorProps>(
  ({ token, devopsHost, userId, projectId, onConfirm, onClose }, ref) => {
    const [selectedMemberList, setSelectedMemberList] =
      useState<ProjectMemberList>([]);
    // 弹窗状态
    const { visible, confirmLoading, okHandle, open, close } =
      useFloatLayer<ProjectMemberList>({
        onClose: onClose as () => void,
        onConfirm: onConfirm as () => Promise<boolean>,
        value: selectedMemberList,
      });
    // 暴露api
    useImperativeHandle(ref, () => ({ open, close }), [open, close]);

    return (
      <Modal
        visible={visible}
        confirmLoading={confirmLoading}
        okText="确定"
        cancelText="取消"
        onOk={okHandle}
        onCancel={close}
        title="选择项目成员"
        className="unicom-member-selector"
        width="70%"
        destroyOnClose={true}
      >
        <Core
          onChange={(value) => setSelectedMemberList(value)}
          visible={visible}
          token={token}
          devopsHost={devopsHost}
          userId={userId}
          projectId={projectId as string}
        />
      </Modal>
    );
  },
);

MemberSelector.defaultProps = {
  projectId: 'pjid_new_ignore_001',
  onConfirm: () => Promise.resolve(true),
};

export default MemberSelector;
