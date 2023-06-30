import Vue, { defineComponent, h, ref } from 'vue';
import { Button as EButton } from 'element-ui';

const asyncNoop = async () => {};

type Props = {
  title?: string;
  content?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnClickModal?: boolean;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

const CottonConfirm = defineComponent<Props>({
  props: {
    title: String,
    content: [String, Function],
    confirmButtonText: String,
    cancelButtonText: String,
    onConfirm: {
      type: Function,
      default: asyncNoop,
    },
    onCancel: {
      type: Function,
      default: asyncNoop,
    },
  },

  setup(props, { expose }) {
    const { onConfirm, onCancel } = props;
    const visible = ref(false);

    const onClickConfirm = async () => {
      try {
        await onConfirm();
        visible.value = false;
      } catch (err) {
        console.error(err);
      }
    };

    const onClickCancel = async () => {
      try {
        await onCancel();
        visible.value = false;
      } catch (err) {
        console.error(err);
      }
    };

    const show = () => {
      visible.value = true;
    };

    const hide = () => {
      visible.value = false;
    };

    expose({ show, hide });

    return { visible, onClickConfirm, onClickCancel };
  },

  render() {
    const {
      visible,
      title,
      content,
      onClickCancel,
      onClickConfirm,
      confirmButtonText,
      cancelButtonText,
    } = this;
    const renderContent = () => {
      if (typeof content === 'function') {
        return content(h);
      }
      return content;
    };
    return (
      <div class={`cotton-confirm cotton-confirm--mask ${visible ? 'cotton-confirm--visible' : ''}`}>
        <div class="cotton-confirm__container">
          <div class="cotton-confirm__title">
            { title }
          </div>
          <div class="cotton-confirm__content">
            { renderContent() }
          </div>
          <div class="cotton-confirm__operate">
            <EButton onClick={onClickCancel} class="cotton-confirm__cancel-button">
              {cancelButtonText}
            </EButton>
            <EButton onClick={onClickConfirm} type="primary" class="cotton-confirm__confirm-button">
              {confirmButtonText}
            </EButton>
          </div>
        </div>
      </div>
    )
  },
});

export default CottonConfirm;

export const createConfirm = (params: Props) => {
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

    const ConfirmConstructor = Vue.extend(CottonConfirm);

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
