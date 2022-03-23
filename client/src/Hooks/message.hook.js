import { notification } from 'antd';
import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback(({ text = 'error', type }) => {
    if (text) {
      notification[`${type}`]({
        message: text,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }
  }, []);
};
