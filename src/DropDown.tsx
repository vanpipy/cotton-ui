import { defineComponent, ref } from 'vue';
import debounce from 'lodash/debounce';

const DropDown = defineComponent({
  setup() {
    const active = ref(false);
    const showBody = ref(false);

    const toggleBody = debounce((state?: boolean) => {
      if (typeof state === 'boolean') {
        showBody.value = state;
      } else {
        showBody.value = !showBody.value;
      }
    }, 200);

    const onToggleBody = () => {
      toggleBody();
    };

    const onFocusinDropDown = () => {
      toggleBody(true);
    };

    const onFocusoutDropDown = () => {
      if (active.value) {
        return;
      }
      toggleBody(false);
    };

    const onEnterDropDown = () => {
      active.value = true;
    };

    const onLeaveDropDown = () => {
      active.value = false;
    }

    return {
      showBody,
      toggleBody,
      onToggleBody,
      onFocusinDropDown,
      onFocusoutDropDown,
      onEnterDropDown,
      onLeaveDropDown,
    };
  },

  render() {
    const {
      $slots,
      showBody,
      onToggleBody,
      onFocusinDropDown,
      onFocusoutDropDown,
      onEnterDropDown,
      onLeaveDropDown,
    } = this;
    const { title, body } = $slots;
    return (
      <div
        tabindex="0"
        class="cotton-dropdown"
        style="position: relative"
        onFocusin={onFocusinDropDown}
        onFocusout={onFocusoutDropDown}
        onMouseenter={onEnterDropDown}
        onMouseleave={onLeaveDropDown}
      >
        <div tabindex="0" class="cotton-dropdown__title" vOn:click_capture={onToggleBody}>
          {title}
        </div>
        <div
          class="cotton-dropdown__body"
          style={`position: absolute; left: 0; top: 100%; ${showBody ? '' : 'display: none;'}` }
        >
          {body}
        </div>
      </div>
    )
  }
});

export default DropDown;
