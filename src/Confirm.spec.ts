import Vue from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { createConfirm } from './Confirm';
import { wait } from './utils';

describe('Confirm', () => {
  const onConfirm = vi.fn();
  const onCancel = vi.fn();
  let instance;

  it('should custom the title and content', async () => {
    instance = createConfirm({
      title: 'A1',
      content: 'B1',
      onConfirm,
      onCancel,
    });
    instance.open();
    await Vue.nextTick();

    const title = document.querySelector('.cotton-confirm__title');
    const content = document.querySelector('.cotton-confirm__content');

    expect(title?.innerHTML).toContain('A1');
    expect(content?.innerHTML).toContain('B1');
  });

  it('should close the confirm trigger the closed callback when click the cancel button', async () => {
    const button: HTMLButtonElement = document.querySelector('.cotton-confirm__cancel-button');
    button.click();
    await Vue.nextTick();
    await wait(300);
    expect(document.querySelector('.cotton-confirm').className).not.toContain('cotton-confirm--visible');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should close the confirm and trigger the confirmed callback when click the confirm button', async () => {
    instance.open();
    const button: HTMLButtonElement = document.querySelector('.cotton-confirm__confirm-button');
    button.click();
    await Vue.nextTick();
    await wait(300);
    expect(document.querySelector('.cotton-confirm').className).not.toContain('cotton-confirm--visible');
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should destroy the instance via `destroy` function', () => {
    instance.destroy();
    expect(document.querySelectorAll('.cotton-confirm')).toHaveLength(0);
  });

  it('should be able to create multiple confirm instances', () => {
    const instanceOne = createConfirm({ title: 'A0', content: 'B0' });
    const instanceTwo = createConfirm({ title: 'A1', content: 'B1' });
    instanceOne.open();
    instanceTwo.open();
    expect(document.querySelectorAll('.cotton-confirm')).toHaveLength(2);
    instanceOne.destroy();
    instanceTwo.destroy();
  });

  it('should render content function', () => {
    instance = createConfirm({
      title: 'C0',
      content: (createElement) => {
        return createElement('div', { class: 'test-div' }, 'Hello');
      },
    });
    instance.open();
    const confirmNode = document.querySelector('.cotton-confirm');
    expect(document.body.innerHTML).toEqual('Hello');
  });
});
