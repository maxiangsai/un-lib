import type { CSSProperties, MouseEventHandler } from 'react';
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Bricks from 'bricks.js';
import CSSTranstion from 'react-transition-group/CSSTransition';
import CategoryProduct from './CategoryProduct';
import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import type { AssertService } from '../../service/types';
import { useProductSider } from '../context';

interface Props {
  style?: CSSProperties;
  handleEnter?: MouseEventHandler;
}

const ProductListMark = forwardRef<HTMLDivElement, Props>(
  ({ handleEnter: handleEnvter }, ref) => {
    const { collapsed, showMask, closeMask, maskRenderProductList } =
      useProductSider();

    const left = useMemo(() => {
      return collapsed ? 48 : 240;
    }, [collapsed]);

    const instance = useRef<Bricks.Instance | null>(null);
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (container.current) {
        if (!instance.current) {
          instance.current = Bricks({
            container: container.current as unknown as Node,
            packed: 'data-packed',
            sizes: [{ columns: 2, gutter: 10 }],
          });
          instance.current.pack();
        }
      }
      return () => {
        instance.current = null;
      };
    });

    const [searchValue, setSearchValue] = useState('');

    const searchList = useMemo(() => {
      if (!searchValue) return maskRenderProductList;
      const list = JSON.parse(
        JSON.stringify(maskRenderProductList),
      ) as AssertService.CategoryVO[];
      return list
        ?.map((item) => {
          return {
            ...item,
            productList: item.productList?.filter((v) =>
              v.name.includes(searchValue),
            ),
          };
        })
        .filter((item) => item.productList && item.productList.length > 0);
    }, [maskRenderProductList, searchValue]);

    useEffect(() => {
      instance.current?.pack();
    }, [searchValue]);

    return (
      <Fragment>
        <CSSTranstion
          timeout={100}
          in={showMask}
          unmountOnExit
          classNames="mask"
        >
          <div
            className="unicom-product-list-mark-wrap"
            onMouseEnter={handleEnvter}
          >
            <div
              className="unicom-product-list-mark__mask"
              onClick={closeMask}
              style={{ left, width: `calc(100vw - ${left}px)` }}
            />
            <div
              className="unicom-product-list-mark"
              ref={ref}
              style={{ left }}
            >
              <div className="unicom-product-list-mark-header">
                <div className="unicom-product-list-mark__searchbox">
                  <Input.Search
                    placeholder="请输入搜索关键字"
                    value={searchValue}
                    allowClear
                    onChange={(e) => setSearchValue(e.target.value.trim())}
                  />
                </div>
                <div
                  className="unicom-product-list-mark__close"
                  onClick={closeMask}
                >
                  <CloseOutlined />
                </div>
              </div>
              <div className="unicom-product-list-mark-body">
                <div ref={container}>
                  {searchList?.map((item) => {
                    return <CategoryProduct key={item.id} category={item} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </CSSTranstion>
      </Fragment>
    );
  },
);

export default ProductListMark;
