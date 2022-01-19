import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { List, Modal } from 'antd';
import Iconfont from '../../Iconfont';

import type { CSSProperties } from 'react';

const bodyStyle: CSSProperties = {
  paddingTop: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  height: '324px',
};

export interface ProjectModel {
  id: string;
  description: string;
  name: string;
  [key: string]: unknown;
}

export interface ProjectSelectorProps {
  projectList: ProjectModel[];
}

export type OpenProjectSelector = (
  fn: (project: ProjectModel) => void,
  title: string,
) => void;

export type ProjectSelectorRef = {
  open: OpenProjectSelector;
};

const ProjectSelector = forwardRef<ProjectSelectorRef, ProjectSelectorProps>(
  (props, ref) => {
    // 缓存自定义点击事件
    const clickItemRef = useRef<null | ((project: ProjectModel) => void)>();

    const [visible, setVisible] = useState(false);

    const [title, setTitle] = useState('');

    const open: OpenProjectSelector = useCallback((fn, currentTitle) => {
      setVisible(true);
      clickItemRef.current = fn;
      if (currentTitle) {
        setTitle(currentTitle);
      }
    }, []);

    const close = useCallback(() => setVisible(false), []);

    // 暴露方法
    useImperativeHandle(
      ref,
      () => {
        return {
          open,
        };
      },
      [open],
    );

    const clickHandle = useCallback(
      (project) => {
        if (
          clickItemRef.current &&
          typeof clickItemRef.current === 'function'
        ) {
          Promise.resolve(clickItemRef.current(project)).then(() => close());
        }
      },
      [clickItemRef, close],
    );

    const renderItem = (project: ProjectModel) => {
      return (
        <List.Item
          className="unicom-project-selector-item"
          onClick={() => clickHandle(project)}
        >
          <List.Item.Meta
            avatar={
              <Iconfont
                type="project"
                className="unicom-project-selector-icon"
              />
            }
            description={project.description}
          />
        </List.Item>
      );
    };

    const modalTitle = useMemo(() => {
      return (
        <div className="unicom-project-selector-modal-header">
          <h3>{title}</h3>
          <p>点击选择一个工程进行下一步</p>
        </div>
      );
    }, [title]);

    return (
      <Modal
        title={modalTitle}
        visible={visible}
        footer={null}
        onCancel={close}
        bodyStyle={bodyStyle}
      >
        <List
          renderItem={renderItem}
          dataSource={props.projectList}
          rowKey="id"
          className="unicom-project-selector-list"
        />
      </Modal>
    );
  },
);

export default ProjectSelector;
