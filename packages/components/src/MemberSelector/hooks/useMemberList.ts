import { useCallback, useState } from 'react';
import { useDebounce, useRequest } from 'ahooks';

import type { AssertService } from '../../service/types';
import { getProjectMemberList } from '../../service/vipthinkDevopsAssetService';
import { useWatch } from '@xt/hooks';

export type UseMemberListOptions = {
  userId: number;
  token: string;
  devopsHost: string;
  projectId: string;
  pid?: number;
  visible: boolean;
};

const useMemberList = ({
  userId,
  token,
  devopsHost,
  projectId,
  pid,
  visible,
}: UseMemberListOptions) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, { wait: 500 });
  const searchHandle = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };
  const fetchMemberService = useCallback(
    async (data: Omit<AssertService.ProjectMemberQuery, 'userId' | 'size'>) => {
      const res = await getProjectMemberList(
        {
          ...data,
          size: 10,
          userId,
        },
        {
          token,
          host: devopsHost,
          projectId,
        },
      );
      return res.data.payload;
    },
    [userId, token, devopsHost, projectId],
  );

  const { data, loading } = useRequest(
    () => {
      const requestData: Omit<AssertService.ProjectMemberQuery, 'userId'> = {
        keyword: debouncedValue,
        size: 10,
        index: page,
      };
      if (pid !== 0) requestData.departIds = pid as number;
      return fetchMemberService(requestData);
    },
    {
      initialData: { rows: [], total: 0 },
      refreshDeps: [pid, page, debouncedValue],
      ready: visible,
    },
  );

  const pageChange = (currentPage: number) => {
    setPage(currentPage);
  };

  useWatch(pid, () => {
    setPage(1);
    setSearchValue('');
  });

  return {
    page,
    pageChange,
    memberList: data?.rows || [],
    total: data?.total || 0,
    loading,
    searchHandle,
    searchValue,
    setSearchValue,
  };
};

export default useMemberList;
