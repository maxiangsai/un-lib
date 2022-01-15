import { useCallback, useMemo, useState } from 'react';
import { useRequest } from 'ahooks';
import { getDepartmentList } from '../../service/vipthinkDevopsAssetService';

import type { DataNode, EventDataNode } from 'antd/lib/tree';
import type { Key } from 'react';
import type { AssertService } from '../../service/types';

function updateTreeData(
  list: DataNode[],
  key: React.Key,
  children: DataNode[],
): DataNode[] {
  return list.map((node) => {
    // 如果是同层，则更新
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    // 如果不是，则递归往下继续更新
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}
const transformer = (data: AssertService.IDept): DataNode => {
  return {
    title: data.departName,
    isLeaf: !data.haveChildren,
    key: data.id,
  };
};
export type UseTreeOptions = {
  userId: number;
  token: string;
  devopsHost: string;
  visible: boolean;
};
type ServiceParams = Pick<AssertService.IDeptQuery, 'pid' | 'departName'>;

const useTree = ({ userId, token, devopsHost, visible }: UseTreeOptions) => {
  // 当前选中的 部门id
  const [pid, setPid] = useState(0);
  // 部门树数据
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  // 搜索部门名称
  const [departName, setDepartName] = useState('');

  const fetchDeptService = useCallback(
    async (params: ServiceParams) => {
      const res = await getDepartmentList(
        {
          departName: params.departName as string,
          pid: params.pid as number,
          userId,
        },
        { token, host: devopsHost },
      );
      return res.data.payload.rows;
    },
    [token, devopsHost, userId],
  );

  // 首次触发
  const { loading } = useRequest(() => fetchDeptService({ pid: 0 }), {
    onSuccess(data) {
      setTreeData(data.map(transformer));
    },
    ready: visible,
  });

  // 搜索
  const isSearch = useMemo(() => !!departName, [departName]);
  const { run: search, data: searchData, loading: searching } = useRequest(
    (name: string) => fetchDeptService({ departName: name }),
    { manual: true, initialData: [] },
  );
  const searchHandle = (value: string) => {
    setDepartName(value);
    if (value) {
      search(value);
    }
  };
  // 懒加载
  const loadData = useCallback(({ key, children }: EventDataNode) => {
    if (children) return Promise.resolve();
    return fetchDeptService({ pid: key as number }).then((res) => {
      const result = res.map(transformer);
      setTreeData((origin) => {
        return updateTreeData(origin, key, result);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectHandle = (keys: Key[]) => {
    setPid(keys[0] as number);
  };
  return {
    pid,
    treeData,
    loading,
    loadData,
    isSearch,
    selectHandle,
    searchHandle,
    searchData,
    searching,
  };
};

export default useTree;
