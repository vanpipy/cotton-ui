import Vue, { h, VNode } from 'vue';
import ConfirmComponent from './Confirm.vue';

const ConfirmConstructor = Vue.extend(ConfirmComponent);

export type confirmProps = {
  title?: string;
  content?: string | ((createElement: typeof h) => VNode);
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnClickModal?: boolean;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
};

export const createConfirm = (params: confirmProps) => {
  const {
    title = '提示',
    content = '是否继续操作',
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    onConfirm,
    onCancel,
  } = params;
  let instance: any;

  const open = () => {
    if (instance) {
      instance.show();
      return;
    }

    instance = new ConfirmConstructor({
      el: document.createElement('div'),
      propsData: {
        title,
        content,
        confirmButtonText,
        cancelButtonText,
        onConfirm,
        onCancel,
      },
    });

    document.body.appendChild(instance.$el);
    instance.show();
  };

  const cancel = () => {
    try {
      instance.hide();
    } catch (err) {
      console.error(err);
    }
  };

  const destroy = () => {
    document.body.removeChild(instance.$el);
    instance = null;
  };

  return { open, cancel, destroy };
};
