import React, { memo } from 'react';

import { Breadcrumb } from 'antd';
import type { SelectedConfig } from './types';

export type StepSelectorSelectedProps = {
  selectedItemList: [string, Record<string, any>][];
  selectedConfig: Exclude<SelectedConfig, false>;
};

const StepSelectorSelected = ({
  selectedItemList,
  selectedConfig,
}: StepSelectorSelectedProps) => {
  return (
    <div className="unicom-step-selector__selected">
      <div className="unicom-step-selector__selected--label">当前选择:</div>
      {selectedItemList.length === 0 ? (
        <span>暂未选择</span>
      ) : (
        <Breadcrumb separator={selectedConfig.separator}>
          {selectedItemList.map(([stepKey, item]) => {
            if (!item) return null;
            return (
              <Breadcrumb.Item key={stepKey}>
                {selectedConfig.renderItem(item, stepKey)}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      )}
    </div>
  );
};

export default memo(StepSelectorSelected);
