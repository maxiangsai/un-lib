import { useEffect, useRef } from 'react';

export interface IFunctionCallback<T> {
  (prevState: T): void;
}

export interface IWatchConfig {
  immediate: boolean;
}

export default function useWatch<T>(
  dep: T,
  cb: IFunctionCallback<T>,
  config?: IWatchConfig,
) {
  const prevValue = useRef<T>();
  const isStop = useRef(false);
  const isInit = useRef(false);

  useEffect(() => {
    const exec = () => cb(prevValue.current as T);

    if (!isStop.current) {
      if (!isInit.current) {
        isInit.current = true;
        if (config?.immediate) {
          exec();
        }
      } else {
        exec();
      }
      prevValue.current = dep;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);

  return () => {
    isStop.current = true;
  };
}
