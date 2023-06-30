import { defineComponent, onMounted, ref } from 'vue';
import { Button as ElementButton } from 'element-ui';
import { wait } from './utils';

type Props = {
  interval?: number;
  delayToTrigger?: number;
  onClick?: () => Promise<void> | void;
}

const LoadableButton = defineComponent<Props>({
  props: {
    interval: {
      type: Number,
      default: 300,
    },
    delayToTrigger: {
      type: Number,
      default: 0,
    },
    onClick: Function,
  },

  setup(props) {
    const { interval, delayToTrigger, onClick } = props;
    const loading = ref(false);
    const delay = ref(-1);
    const timer = ref();

    const onTriggerClick = async () => {
      loading.value = true;
      await wait(interval);
      try {
        if (typeof onClick === 'function') {
          await onClick();
        }
      } catch (err) {
        console.error(err);
      }
      loading.value = false;
    };

    const countdown = async () => {
      if (delay.value > 0) {
        timer.value = setTimeout(() => {
          delay.value -= 1;
          countdown();
        }, 1000);
      } else {
        await onTriggerClick();
        if (timer.value > -1) {
          clearTimeout(timer.value);
        }
      }
    };

    onMounted(() => {
      if (delayToTrigger > delay.value) {
        delay.value = delayToTrigger;
        countdown();
      }
    });

    return { loading, delay, onTriggerClick };
  },

  render() {
    const { delay, loading, onTriggerClick, $attrs, $slots } = this;
    const slot = $slots.default;
      return (
        <ElementButton {...{ attrs: { ...$attrs, loading, onClick: onTriggerClick } }}>
          {slot}
          {delay > 0 ? <span>{delay}</span> : ''}
        </ElementButton>
      )
  },
});

export default LoadableButton;
