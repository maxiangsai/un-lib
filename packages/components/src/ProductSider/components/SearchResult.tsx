import React from 'react';

import { List } from 'antd';
import ProductItem from './ProducItem';

import type { AssertService } from '../../service/types';

interface Props {
  searchList: AssertService.ProductVO[];
}

const SearchResult = ({ searchList }: Props) => {
  return (
    <div className="unicom-search-result">
      <div className="unicom-search-result-count">
        找到{searchList?.length}个结果
      </div>
      <List
        dataSource={searchList}
        renderItem={(product) => <ProductItem product={product} />}
      />
    </div>
  );
};

export default SearchResult;
