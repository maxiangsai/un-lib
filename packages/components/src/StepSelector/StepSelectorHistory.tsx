import React, { memo } from 'react';

import { Button } from 'antd';
import type { ReactElement } from 'react';
import type { SelectData } from './types';

export type StepSelectorHistoryProps = {
  historyValue: SelectData[];
  renderItem: (selectData: SelectData) => ReactElement | null;
  onClickItem: (selectData: SelectData) => void;
  onClear: () => void;
};
const StepSelectorHistory = ({
  historyValue,
  renderItem,
  onClickItem,
  onClear,
}: StepSelectorHistoryProps) => {
  return (
    <div className="xt-step-selector__history">
      <div className="xt-step-selector__history--head">
        <div className="xt-step-selector__history--title">
          最近查看（{historyValue.length}）
        </div>
        <div className="xt-step-selector__history--clear">
          <Button
            danger
            type="text"
            style={{ fontSize: 12 }}
            onClick={() => onClear()}
          >
            清除历史记录
          </Button>
        </div>
      </div>
      <div className="xt-step-selector__history--content">
        {historyValue && historyValue.length > 0
          ? historyValue.map((item, index) => {
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => onClickItem(item)}
                  className="xt-step-selector__history--item"
                >
                  {renderItem && renderItem(item)}
                </div>
              );
            })
          : '暂无历史记录'}
      </div>
    </div>
  );
};

export default memo(StepSelectorHistory);
