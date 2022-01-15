import React, { useCallback, useState } from 'react';

import { Col, Row } from 'antd';
import DepartmentTree from './components/DepartmentTree';
import MemberList from './components/MemberList';
import SelectedUserList from './components/SelectedUserList';

import useMemberList from './hooks/useMemberList';
import useTree from './hooks/useTree';
import { useUpdateEffect } from 'ahooks';

import classNames from 'classnames';
import difference from 'ramda/es/difference';
import union from 'ramda/es/union';

import type { ProjectMember, ProjectMemberList } from './index';
import type { AssertService } from '../service/types';
import type { CommonProps } from '../typings';

interface CoreProps extends CommonProps {
  devopsHost: string;
  token: string;
  userId: number;
  projectId?: string;
  visible: boolean;
  onChange: (value: ProjectMemberList) => void;
}
const Core = ({
  devopsHost,
  visible,
  token,
  userId,
  projectId,
  onChange,
  style,
  className,
}: CoreProps) => {
  const [
    selectedMemberList,
    setSelectedMemberList,
  ] = useState<ProjectMemberList>([]);
  const {
    pid,
    treeData,
    searchData,
    searchHandle,
    searching,
    selectHandle,
    loadData,
    isSearch,
    loading: treeLoading,
  } = useTree({
    userId,
    token,
    devopsHost,
    visible,
  });
  const {
    memberList,
    total,
    loading: memberLoading,
    page,
    pageChange,
    searchHandle: memberSearchHandle,
    setSearchValue,
    searchValue,
  } = useMemberList({
    userId,
    token,
    devopsHost,
    projectId: projectId as string,
    pid,
    visible,
  });

  const ids2MemberList = useCallback(
    (ids: number[]) => {
      return ids.map((id) => memberList?.find((member) => member.id === id));
    },
    [memberList],
  );

  // 业务逻辑
  const [curIds, setCurIds] = useState<number[]>([]);
  const [allCheck, setAllCheck] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  const deleteMember = (value: ProjectMember) => {
    setSelectedMemberList((prevState) =>
      prevState.filter((item) => item.id !== value.id),
    );
    setCurIds((prevState) => prevState.filter((id) => id !== value.id));
  };

  const checkAllChangeHandle = useCallback(
    (value: boolean) => {
      setAllCheck(value);
      const ids = memberList!.map((item) => item.id);
      if (value) {
        setCurIds(ids);
        setSelectedMemberList((prevState) => {
          return union(prevState, memberList as ProjectMemberList);
        });
      } else {
        setCurIds([]);
        setSelectedMemberList((prevState) => {
          return prevState.filter((ps) => !ids.some((id) => id === ps.id));
        });
      }
      setIndeterminate(false);
    },
    [memberList],
  );

  const curIdsChangeHandle = useCallback(
    (ids: number[]) => {
      setCurIds(ids);
      setSelectedMemberList((prevState) => {
        const members = ids2MemberList(ids);
        // 过滤掉已选数据
        const data = members.filter(
          (item) => !prevState.some((ps) => ps.id === item?.id),
        );
        const newData = [...prevState, ...data] as ProjectMemberList;

        // 计算需要删除的人
        const deleteIds = difference(curIds, ids);

        return newData.filter((item) => {
          return !deleteIds.includes(item.id);
        });
      });
    },
    [ids2MemberList, curIds],
  );

  const curIdsEffect = useCallback(() => {
    const ids = memberList
      ?.filter((mem) => {
        const match = selectedMemberList.some((item) => item.id === mem.id);
        return match;
      })
      .map((item) => item.id);
    setCurIds(ids as number[]);

    const isCheckAll = selectedMemberList.length
      ? memberList!.every((sm) => {
          return selectedMemberList.some((item) => item.id === sm.id);
        })
      : false;

    const isIndeterminate =
      !isCheckAll && selectedMemberList.length
        ? memberList!.some((sm) => {
            return selectedMemberList.some((item) => item.id === sm.id);
          })
        : false;

    setIndeterminate(isIndeterminate);
    setAllCheck(isCheckAll);
  }, [memberList, selectedMemberList]);

  useUpdateEffect(() => {
    curIdsEffect();
  }, [memberList, curIdsEffect]);

  useUpdateEffect(() => {
    onChange(selectedMemberList);
  }, [onChange, selectedMemberList]);

  return (
    <Row className={classNames('un-member-selector', className)} style={style}>
      <Col span={8}>
        <DepartmentTree
          loading={treeLoading}
          searching={searching}
          isSearch={isSearch}
          searchData={searchData as AssertService.IDept[]}
          loadData={loadData}
          searchHandle={searchHandle}
          onSelect={selectHandle}
          treeData={treeData}
        />
      </Col>
      <Col span={8}>
        <MemberList
          searchHandle={memberSearchHandle}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onCheckAllChange={checkAllChangeHandle}
          value={curIds}
          onChange={curIdsChangeHandle}
          allCheck={allCheck}
          indeterminate={indeterminate}
          loading={memberLoading}
          memberList={memberList as ProjectMember[]}
          total={total as number}
          page={page}
          pageChange={pageChange}
        />
      </Col>
      <Col span={8}>
        <SelectedUserList data={selectedMemberList} onDelete={deleteMember} />
      </Col>
    </Row>
  );
};
export default Core;
