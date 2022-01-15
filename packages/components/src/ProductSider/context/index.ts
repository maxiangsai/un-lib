import { createContext, useCallback, useContext, useMemo } from 'react';

import type { AssertService } from '../../service/types';

export type OnSubscribeChange = (
  product: AssertService.ProductVO & { isCancel: boolean },
) => void;

export interface IProductSiderContext {
  subscribeProductList?: AssertService.ProductVO[];
  categoryList?: AssertService.CategoryVO[];
  collapsed: boolean;
  showMask: boolean;
  changeShowMask: (value: boolean) => void;
  changeCollapsed: (value: boolean) => void;
  fetchData: () => void;
  // userId: string | number;
  devopsHost: string;
  token: string;
  goProductHandle: (product: AssertService.ProductVO) => void;
  onSubscribeChange?: OnSubscribeChange;
  onClickProduct?: (product: AssertService.ProductVO) => void;
}

export const ProductSiderContext = createContext<IProductSiderContext | null>(
  null,
);

export const useProductSider = () => {
  const {
    collapsed,
    changeCollapsed,
    showMask,
    changeShowMask,
    categoryList,
    fetchData,
    subscribeProductList,
    // userId,
    devopsHost,
    token,
    goProductHandle,
    onSubscribeChange,
    onClickProduct,
  } = useContext(ProductSiderContext) as IProductSiderContext;

  const toggleCollapsed = useCallback(() => {
    changeCollapsed(!collapsed);
    changeShowMask(collapsed);
  }, [changeCollapsed, changeShowMask, collapsed]);

  const closeMask = useCallback(() => {
    changeShowMask(false);
    changeCollapsed(true);
  }, [changeCollapsed, changeShowMask]);

  const openMask = useCallback(() => {
    changeShowMask(true);
  }, [changeShowMask]);

  const maskRenderProductList = useMemo(() => {
    return categoryList?.map((item) => {
      return {
        ...item,
        productList: item.productList?.map((product) => {
          const isSubscribe = subscribeProductList?.some(
            (v) => v.productId === product.id,
          );
          return {
            ...product,
            isSubscribe,
          };
        }),
      };
    });
  }, [subscribeProductList, categoryList]);

  return {
    // userId,
    devopsHost,
    token,
    goProductHandle,
    collapsed,
    toggleCollapsed,
    showMask,
    closeMask,
    openMask,
    changeCollapsed,
    maskRenderProductList,
    fetchData,
    onSubscribeChange,
    onClickProduct,
  };
};
