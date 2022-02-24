import './style/index.less';

import type { CSSProperties, RefObject } from 'react';
import { Layout, Menu } from 'antd';
import type {
  ProjectModel,
  ProjectSelectorRef,
} from './components/ProjectSelector';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getProductList,
  getSubscribeProductList,
} from '../service/vipthinkDevopsAssetService';
import { useClickAway, useDebounceFn } from 'ahooks';
import All from './components/All';
import type { IconMapType } from '../Iconfont';
import Iconfont from '../Iconfont';
import type { OnSubscribeChange } from './context';
import type { AssertService } from '../service/types';
import ProductItem from './components/ProducItem';
import ProductListMark from './components/ProductListMark';
import { ProductSiderContext } from './context';
import ProjectSelector from './components/ProjectSelector';
import classNames from 'classnames';

export type ProductSiderRef = RefObject<{
  open: () => void;
  close: () => void;
  getState: () => { collapsed: boolean; showMask: boolean };
}>;

export type Fixedable = {
  headerHeight?: number;
  zIndex?: number;
};
export interface ProductSiderProps {
  devopsHost: string;

  token: string;

  /**
   * @description 暴露ref对象，提供open、close 方法
   */
  productSiderRef?: ProductSiderRef;

  /**
   * @description 项目列表
   */
  projectList?: ProjectModel[];

  onSubscribeChange?: OnSubscribeChange;

  fixed?: Fixedable;

  onClickProduct?: (data: AssertService.ProductVO) => void;
}

function calcFixedStyle(data?: Fixedable) {
  const style: CSSProperties = {};
  if (data) {
    style.position = 'fixed';
    style.left = 0;
    if (data.headerHeight) {
      style.top = data.headerHeight;
      style.height = `calc(100vh - ${data.headerHeight}px)`;
    }
    if (data.zIndex) {
      style.zIndex = data.zIndex;
    }
  }
  return style;
}

const ProductSider = (props: ProductSiderProps) => {
  const { devopsHost, token } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [showMask, setShowMask] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [subscribeProductList, setSubscribeProductList] = useState<
    AssertService.ProductVO[]
  >([]);
  const [categoryList, setCategoryList] = useState<AssertService.CategoryVO[]>(
    [],
  );
  // const initRef = useRef<boolean>(false);
  const siderRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const psRef = useRef<ProjectSelectorRef>(null);

  const fetchData = useCallback(() => {
    Promise.all([
      getSubscribeProductList({ host: devopsHost, token }),
      getProductList({ host: devopsHost, token }),
    ]).then(([p1, p2]) => {
      const { productCategories, productVOs } = p2.data.payload;
      // groupBy
      productVOs.forEach((product: AssertService.ProductVO) => {
        const target = productCategories.find(
          (category: AssertService.CategoryVO) => {
            return category.id === product.categoryId;
          },
        );
        if (!target) {
          return;
        }
        target.productList = target.productList
          ? target.productList.concat([product])
          : [product];
      });
      setSubscribeProductList(p1.data.payload);

      setCategoryList(
        productCategories.sort((a, b) => {
          return a.sort - b.sort;
        }),
      );
    });
  }, [devopsHost, token]);

  useEffect(() => {
    if (!props.token) {
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useImperativeHandle(
    props.productSiderRef,
    () => {
      return {
        getState: () => {
          return {
            showMask,
            collapsed,
          };
        },
        open: () => {
          setShowMask(true);
          setCollapsed(false);
        },
        close: () => {
          setShowMask(false);
          setCollapsed(true);
        },
      };
    },
    [showMask, collapsed],
  );

  const goProductHandle = useCallback((product: AssertService.ProductVO) => {
    psRef.current?.open((project) => {
      const url = product.url.replace(/_projectId/, project.id);
      window.open(url, '_blank');
      return Promise.resolve(true);
    }, product.name);
  }, []);

  const contextValue = {
    devopsHost,
    token,
    showMask,
    fetchData,
    changeShowMask: setShowMask,
    subscribeProductList,
    changeCollapsed: setCollapsed,
    collapsed,
    onSubscribeChange: props.onSubscribeChange,
    categoryList,
    goProductHandle,
    onClickProduct: props.onClickProduct,
  };

  const { run: enterItemHandle, cancel } = useDebounceFn(
    () => {
      if (collapsed) {
        setCollapsed(false);
      }
      setShowScrollbar(true);
    },
    { wait: 1000 },
  );

  useClickAway(() => {
    setCollapsed(true);
    setShowMask(false);
  }, [siderRef, maskRef]);

  useClickAway(() => {
    setCollapsed(true);
  }, [siderRef]);

  const overflowStyle = useMemo<CSSProperties>(
    () => (showScrollbar ? { overflowX: 'hidden', overflowY: 'auto' } : {}),
    [showScrollbar],
  );

  const wrapperStyle = useMemo(
    () => calcFixedStyle(props.fixed),
    [props.fixed],
  );
  const handleMouseLeave = useCallback(() => {
    setShowScrollbar(false);
    setCollapsed(true);
    cancel();
  }, [cancel]);
  return (
    <>
      <ProductSiderContext.Provider value={contextValue}>
        <div
          className={classNames('xt-product-sider', { 'open-mask': showMask })}
          ref={siderRef}
          style={wrapperStyle}
        >
          <Layout.Sider
            collapsedWidth={48}
            theme="light"
            style={overflowStyle}
            onMouseLeave={handleMouseLeave}
            collapsed={collapsed}
            width={240}
          >
            <All />
            <Menu
              mode="inline"
              className="xt-product-sider__subscribe-list"
              inlineIndent={16}
              theme="light"
              onMouseEnter={enterItemHandle}
            >
              {subscribeProductList.map((item) => {
                const target = {
                  ...item,
                  name: item.productName || '',
                  id: item.productId || '',
                  isSubscribe: true,
                };
                return (
                  <Menu.Item
                    key={target.id}
                    title={target.name}
                    icon={<Iconfont type={target.icon as IconMapType} />}
                  >
                    {!collapsed && <ProductItem product={target} />}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Layout.Sider>
          <ProductListMark
            handleEnter={() => setCollapsed(false)}
            ref={maskRef}
          />
        </div>
        {props.projectList && (
          <ProjectSelector ref={psRef} projectList={props.projectList} />
        )}
      </ProductSiderContext.Provider>
    </>
  );
};
ProductSider.defaultProps = {
  projectList: [],
};

export default ProductSider;
