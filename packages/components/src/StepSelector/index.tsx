import './style.less';

import { Modal, Spin } from 'antd';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import type {
  SelectData,
  SelectedConfig,
  StepItem,
  StepSelectorHistoryConfig,
} from './types';

import type { CommonProps } from '../typings';
import type { ReactElement } from 'react';
import StepItemPane from './StepItemPane';
import StepSelectorHistory from './StepSelectorHistory';
import StepSelectorSelected from './StepSelectorSelected';
// @ts-ignore
import { useFloatLayer } from '@unicom/hooks';
import { useLocalStorageState } from 'ahooks';

export type StepSelectorProps = CommonProps & {
  title?: string;
  subTitle?: string;
  steps: StepItem[];
  onLastClick?: (selectData: SelectData) => Promise<any>;
  footer?: ReactElement | null;
  selectedConfig?: SelectedConfig;
  history: StepSelectorHistoryConfig;
};

export type StepSelectorRef = {
  open: () => void;
};

const StepSelector = forwardRef<StepSelectorRef, StepSelectorProps>(
  (
    {
      steps,
      onLastClick,
      title,
      subTitle,
      selectedConfig,
      history,
      footer,
      ...props
    },
    ref,
  ) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [selectData, setSelectData] = useState<SelectData>({});
    const [lastLoading, setLastLoading] = useState(false);

    const [historyValue, setHistoryValue] = useLocalStorageState<SelectData[]>(
      history.storageKey,
      [],
    );

    const { visible, open, close } = useFloatLayer({
      onClose() {
        setStepIndex(0);
        setSelectData({});
      },
    });

    useImperativeHandle(ref, () => {
      return {
        open,
      };
    });

    const step = useMemo(() => steps[stepIndex], [stepIndex, steps]);

    const isLast = useMemo(
      () => stepIndex === steps.length - 1,
      [stepIndex, steps],
    );

    const modalTitle = (
      <div className="unicom-step-selector-head">
        <h4 style={{ margin: 0 }}>{title}</h4>
        <p style={{ margin: 0 }}>{subTitle}</p>
      </div>
    );

    const handleLastClick = useCallback(
      async (data: SelectData, updateHistory = false) => {
        if (onLastClick) {
          try {
            // @ts-ignore
            if (updateHistory) {
              setHistoryValue((prevState) =>
                [data, ...(prevState as [])].slice(0, history.maxCount),
              );
            }
            setLastLoading(true);
            await onLastClick(data);

            close();
          } finally {
            setLastLoading(false);
          }
        }
      },
      [history, onLastClick, close, setHistoryValue],
    );

    const clickItemHandle = useCallback(
      async (item: any) => {
        const data = {
          ...selectData,
          [step.stepKey]: item,
        };
        setSelectData(data);
        if (isLast) {
          handleLastClick(data, true);
        } else {
          setStepIndex((i) => i + 1);
        }
      },
      [handleLastClick, isLast, selectData, step.stepKey],
    );

    const selectedItemList: any[] = useMemo(() => {
      if (Object.keys(selectData).length === 0) return [];
      return steps.map((item) => {
        return [item.stepKey, selectData[item.stepKey]];
      });
    }, [selectData, steps]);

    const handleClear = useCallback(() => {
      Modal.confirm({
        content: '确定清除历史记录？',
        title: '警告',
        type: 'warning',
        onOk() {
          setHistoryValue([]);
        },
      });
    }, [setHistoryValue]);

    return (
      <Modal
        destroyOnClose
        visible={visible}
        footer={footer}
        width="80%"
        onCancel={close}
        title={modalTitle}
      >
        <Spin spinning={lastLoading} tip="正在处理...">
          <div className="unicom-step-selector" {...props}>
            <StepSelectorHistory
              onClickItem={handleLastClick}
              onClear={handleClear}
              historyValue={historyValue}
              renderItem={history.renderItem}
            />
            {selectedConfig && (
              <StepSelectorSelected
                selectedConfig={selectedConfig}
                selectedItemList={selectedItemList}
              />
            )}
            <StepItemPane
              {...step}
              showBack={stepIndex > 0}
              onClickItem={clickItemHandle}
              selectData={selectData}
              onBack={() => setStepIndex((i) => i - 1)}
            />
          </div>
        </Spin>
      </Modal>
    );
  },
);

StepSelector.defaultProps = {
  footer: null,
  selectedConfig: false,
  history: {
    storageKey: 'step-selector-history',
    maxCount: 10,
    renderItem: () => null,
  },
};

export default StepSelector;
