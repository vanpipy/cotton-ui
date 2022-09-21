import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import LoadableButton from './index.vue';

describe('LoadableButton', () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: new Date(1970, 1, 1, 0, 0, 0) })
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.useRealTimers()
  })

  it('should render the custom content', () => {
    const wrapper = mount(LoadableButton, {
      slots: {
        default: 'test button'
      }
    });
    expect(wrapper.text()).toContain('test button')
  })

  it('should be same way to use the attrs.type with Element-ui.Button', () => {
    const wrapper = mount(LoadableButton, {
      slots: {
        default: 'test button'
      },
      propsData: {
        type: 'primary'
      }
    });
    expect(wrapper.classes()).include('el-button--primary')
  })

  it('should trigger the onClick property with inteval 300ms defaultly when trigger click on the button', async () => {
    const onClick = vi.fn();
    const wrapper = mount(LoadableButton, {
      propsData: { onClick }
    });
    await wrapper.find('button').trigger('click')
    await vi.advanceTimersByTime(100)
    expect(onClick).toHaveReturnedTimes(0)
    await vi.advanceTimersByTime(199)
    expect(onClick).toHaveReturnedTimes(0)
    await vi.advanceTimersByTime(1)
    expect(onClick).toHaveReturnedTimes(1)
  })

  it('should custom the inteval when trigger click', async () => {
    const onClick = vi.fn();
    const wrapper = mount(LoadableButton, {
      propsData: {
        onClick,
        interval: 1000
      }
    });
    await wrapper.find('button').trigger('click')
    await vi.advanceTimersByTime(999)
    expect(onClick).toHaveBeenCalledTimes(0)
    await vi.advanceTimersByTime(1)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should auto-click the button when using props.delayToTrigger seconds which is greater than zero', async () => {
    const onClick = vi.fn();
    const wrapper = mount(LoadableButton, {
      propsData: {
        onClick,
        delayToTrigger: 1
      }
    });
    await vi.advanceTimersByTime(1000)
    await vi.advanceTimersByTime(299)
    expect(onClick).toHaveBeenCalledTimes(0)
    await vi.advanceTimersByTime(1)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
