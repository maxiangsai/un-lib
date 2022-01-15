import { useCallback, useState } from 'react';

export type UseFloatLayerOptions<T = any> = {
  onClose?: () => void;
  onConfirm?: (data?: T) => Promise<boolean>;
  value?: (() => T) | T;
};

const useFloatLayer = <T>({
  onClose,
  onConfirm,
  value,
}: UseFloatLayerOptions<T>) => {
  // 弹窗状态
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);

  const close = useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const okHandle = useCallback(async () => {
    // 执行异步函数
    try {
      if (onConfirm) {
        setConfirmLoading(true);
        // @ts-ignore
        const payload = value && typeof value === 'function' ? value() : value;
        const res = await onConfirm(payload);
        if (res) {
          close();
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    } finally {
      setConfirmLoading(false);
    }
  }, [close, onConfirm, value]);

  return {
    visible,
    open,
    close,
    okHandle,
    confirmLoading,
  };
};

export type UseFloatLayer = ReturnType<typeof useFloatLayer>;

export default useFloatLayer;
