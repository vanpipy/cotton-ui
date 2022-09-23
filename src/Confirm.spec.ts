import { beforeEach, describe, expect, it } from 'vitest';
import { createConfirm } from './Confirm';
import { wait } from './utils';

describe('Confirm', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should create a open instance', () => {
    const open = createConfirm({
      title: 'A0',
      content: 'B0',
    });
    expect(typeof open).toEqual('function');
  });

  it('should custom the title and content', async () => {
    const open = createConfirm({
      title: 'A1',
      content: 'B1',
    });
    open();
    await wait();

    const title = document.querySelector('.el-message-box__title');
    const content = document.querySelector('.el-message-box__message');

    expect(title?.innerHTML).toContain('A1');
    expect(content?.innerHTML).toContain('B1');
  });
});
