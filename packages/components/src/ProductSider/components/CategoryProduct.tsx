import React from 'react';
import { List } from 'antd';
import ProductItem from './ProducItem';

import type { AssertService } from '../../service/types';

interface Props {
  category: AssertService.CategoryVO;
}

const CategoryProduct = ({ category }: Props) => {
  const renderProductList = (product: AssertService.ProductVO) => {
    return (
      <div className="xt-category__list-item">
        <ProductItem product={product} />
      </div>
    );
  };
  return (
    <div className="xt-category" data-packed={category.id}>
      <div className="xt-category__title">{category.title}</div>
      <List
        locale={{ emptyText: `暂无${category.title}产品` }}
        className="xt-category__list"
        dataSource={category.productList}
        renderItem={renderProductList}
      />
    </div>
  );
};

export default CategoryProduct;
