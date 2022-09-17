import { Message, MessageBox } from 'element-ui';

export type confirmProps = {
  title?: string;
  content?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnClickModal?: boolean;
}

export type confirmCallback = {
  onConfirm?: () => Promise<void>;
}

export const createConfirm = (params: confirmProps) => {
  const {
    title = '提示',
    content = '是否继续操作',
    type = 'warning',
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    closeOnClickModal = false,
  } = params;

  return (callback?: confirmCallback) => new Promise<void>((resolve, reject) => {
    const { onConfirm = async () => {} } = callback as confirmCallback || {};

    MessageBox.confirm(content, title, {
      type,
      confirmButtonText,
      cancelButtonText,
      closeOnClickModal,
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true

          try {
            await onConfirm()
          } catch (err) {
            Message.error(err as string)
          }

          instance.confirmButtonLoading = false
        } else {
          done()
        }
      }
    }).then(() => {
      resolve()
    }).catch(() => {
      reject(Error('canceled'))
    })
  })
};
