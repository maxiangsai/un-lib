import React, { useCallback, useMemo, useState } from 'react';
import { Tooltip, message } from 'antd';
import Iconfont from '../../Iconfont';
import type { AssertService } from '../../service/types';
import type { ReactEventHandler } from 'react';
import classnames from 'classnames';
import { useProductSider } from '../context';
import {
  cancelSubscribeProduct,
  subscribeProduct,
} from '../../service/vipthinkDevopsAssetService';

interface Props {
  product: AssertService.ProductVO;
}

const ProductItem = ({ product }: Props) => {
  const {
    fetchData,
    devopsHost,
    token,
    goProductHandle,
    onSubscribeChange,
    onClickProduct,
  } = useProductSider();
  const [showIcon, setShowIcon] = useState(false);

  const isUp = useMemo(() => {
    return !!product.url;
  }, [product.url]);

  const clickHandle = useCallback(() => {
    if (!isUp) {
      message.info('产品暂未上架，敬请期待');
      return;
    }
    if (product.needSelectProject) {
      goProductHandle(product);
    } else if (product.isPrecise) {
      if (onClickProduct) {
        onClickProduct(product);
      }
    } else {
      window.open(product.url, '_blank');
    }
  }, [isUp, product, goProductHandle, onClickProduct]);

  const toggleSubscribe = useCallback(
    (currentProduct: AssertService.ProductVO) => {
      if (currentProduct.isSubscribe) {
        cancelSubscribeProduct(currentProduct.id, {
          host: devopsHost,
          token,
        }).then(() => {
          message.success(
            `取消订阅产品 ${currentProduct.name} 成功`,
            0.6,
            fetchData,
          );
          onSubscribeChange?.({ ...currentProduct, isCancel: true });
        });
      } else {
        subscribeProduct(currentProduct.id, {
          host: devopsHost,
          token,
        }).then(() => {
          message.success(
            `订阅产品 ${currentProduct.name} 成功`,
            0.6,
            fetchData,
          );
          onSubscribeChange?.({ ...currentProduct, isCancel: false });
        });
      }
    },
    [devopsHost, fetchData, onSubscribeChange, token],
  );

  const subscribeHandle: ReactEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (isUp) {
        toggleSubscribe(product);
        setShowIcon(false);
      }
    },
    [isUp, toggleSubscribe, product],
  );

  const finallyShowValue = useMemo(() => {
    return product.isSubscribe || showIcon;
  }, [showIcon, product.isSubscribe]);
  const enterHandle = useCallback(() => {
    if (isUp) setShowIcon(true);
  }, [isUp]);
  const leaveHandle = useCallback(() => {
    if (isUp) setShowIcon(false);
  }, [isUp]);

  return (
    <div
      className="un-product-item"
      onMouseEnter={enterHandle}
      onMouseLeave={leaveHandle}
      style={{
        opacity: isUp ? 1 : 0.3,
        cursor: isUp ? 'pointer' : 'not-allowed',
      }}
    >
      <div className="un-product-item-text" onClick={clickHandle}>
        {product.name}
      </div>
      {finallyShowValue && isUp && (
        <div
          className={classnames({
            'un-product-item-subscribe': true,
            'is-subscribe': product.isSubscribe,
          })}
          onClick={subscribeHandle}
        >
          <Tooltip title={product.isSubscribe ? '取消订阅' : '订阅'}>
            <Iconfont
              type={product.isSubscribe ? 'bookmark' : 'bookmarkLine'}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

ProductItem.defaultProps = {
  isCollapsedShowIcon: true,
};

export default ProductItem;
