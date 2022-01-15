import React, { memo } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import type { CommonProps } from '../typings';

interface Props extends CommonProps {
  onClick?: () => void;
  text?: string;
}

const AddCard = ({ onClick, text, style }: Props) => {
  return (
    <div className="fls-default-add" style={style} onClick={onClick}>
      <PlusOutlined />
      <span>{text || '添加'}</span>
    </div>
  );
};

export default memo(AddCard);
