import React, { useMemo, useState, useCallback } from 'react';

import { Modal } from 'antd';
import DefaultAdd from './DefaultAdd';
import Grid from '../Grid';

import { useFloatLayer } from '@unicom/hooks';

import adjust from 'ramda/es/adjust';
import always from 'ramda/es/always';

import type { FormInstance } from 'antd';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { CommonProps } from '../typings';

import './style.less';

const bodyStyle: CSSProperties = {
  maxHeight: '70vh',
  overflowX: 'hidden',
  overflowY: 'auto',
};

export interface FloatLayerSelectorProps<T = any> extends CommonProps {
  col?: number;
  title?: string;
  addNode?: ReactNode;
  addNodeStyle?: CSSProperties;
  value?: T[];
  onChange?: (data: T[]) => void;
  renderItem?: (
    data: T,
    actions: {
      remove: () => void;
      edit: () => void;
    },
  ) => ReactElement;
  onClose?: () => void;
  onOpen?: () => void;
  formNode?: ReactElement;
  form: FormInstance;
  gutter?: number;
  renderLayout?: (nodes: {
    addNode: ReactElement;
    dataNodes: (ReactElement | null)[];
  }) => ReactElement;
}

function FloatLayerSelector<T = any>(props: FloatLayerSelectorProps<T>) {
  const {
    addNode,
    addNodeStyle,
    col,
    value,
    title,
    renderItem,
    onClose,
    onChange,
    onOpen,
    formNode,
    form,
    gutter,
    renderLayout,
  } = props;
  const [data, setData] = useState<T[]>([]);
  const { visible, open, close } = useFloatLayer({});

  const [curEditIndex, setCurEditIndex] = useState<number | null>(null);

  const finallyAddNode = useMemo(() => {
    if (addNode && React.isValidElement(addNode)) {
      return addNode;
    }
    return <DefaultAdd style={addNodeStyle} />;
  }, [addNode, addNodeStyle]);

  const clickHandle = useCallback(() => {
    open();
    if (onOpen) onOpen();
  }, [open, onOpen]);

  const closeHandle = useCallback(() => {
    form.resetFields();
    close();
    setCurEditIndex(null);
    if (onClose) onClose();
  }, [close, onClose, form]);

  const updateValue = useCallback(
    (updateFn: (data: T[]) => T[]) => {
      if (onChange) {
        if (value) {
          const newValue = updateFn(value);
          setData(newValue);
          onChange(newValue);
          form.resetFields();
        }
      }
    },
    [onChange, value, form],
  );

  const okHandle = useCallback(async () => {
    await form.validateFields();
    const formValue = form.getFieldsValue();
    updateValue((v) => {
      if (curEditIndex !== null) {
        return adjust(curEditIndex, always(formValue), v);
      }
      return [...v, formValue];
    });
    closeHandle();
  }, [closeHandle, updateValue, form, curEditIndex]);

  const deleteHandle = useCallback(
    (index: number) => {
      updateValue((prevState) => {
        return prevState.filter((_, i) => {
          return i !== index;
        });
      });
    },
    [updateValue],
  );

  const editHandle = useCallback(
    (item: T, index: number) => {
      clickHandle();
      setCurEditIndex(index as number);
      form.setFieldsValue(item);
    },
    [form, clickHandle],
  );

  const addNodes = (
    <div className="fls-placeholder" onClick={clickHandle}>
      {finallyAddNode}
    </div>
  );
  const itemNodes = data.map((item, index) => {
    return renderItem
      ? renderItem(item, {
          remove: () => deleteHandle(index),
          edit: () => editHandle(item, index),
        })
      : null;
  });

  return (
    <div className="fls">
      {renderLayout ? (
        renderLayout({
          addNode: addNodes,
          dataNodes: itemNodes,
        })
      ) : (
        <Grid gutter={gutter} col={col as number}>
          {addNodes}
          {itemNodes}
        </Grid>
      )}
      <Modal
        width="70%"
        visible={visible}
        okText="??????"
        cancelText="??????"
        onCancel={closeHandle}
        destroyOnClose
        title={title}
        bodyStyle={bodyStyle}
        onOk={okHandle}
      >
        {formNode}
      </Modal>
    </div>
  );
}
FloatLayerSelector.defaultProps = {
  col: 3,
  gutter: 40,
};
export default FloatLayerSelector;
