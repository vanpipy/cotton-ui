import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import { beforeAll, describe, expect, it } from 'vitest';
import { wait } from './utils';
import DropDown from './DropDown';

describe('DropDown', () => {
  let wrapper: Wrapper<Vue, Element>;

  beforeAll(() => {
    document.body.innerHTML = '<p id="other">other</p>';
  });

  it('should render the cunstom title and body', () => {
    wrapper = mount(DropDown, {
      attachTo: document.body,
      slots: {
        title: '<span class="test-in-title">title</span>',
        body: '<div class="test-in-body">body</div>',
      },
    });
    expect(wrapper.findAll('.test-in-title')).toHaveLength(1);
    expect(wrapper.findAll('.test-in-body')).toHaveLength(1);
  });

  it('should dropdown the panel when enter dropdown and click the title element', async () => {
    const container = wrapper.find('.cotton-dropdown');
    const title = wrapper.find('.cotton-dropdown__title');
    const body = wrapper.find('.cotton-dropdown__body');
    container.element.dispatchEvent(new MouseEvent('mouseenter'));
    title.element.dispatchEvent(new Event('click'));
    await wait(201);
    await Vue.nextTick();
    expect(body.attributes().style).not.toContain('display: none');
  });

  it('should not putaway the panel when click the body element', async () => {
    const body = wrapper.find('.cotton-dropdown__body');
    body.element.dispatchEvent(new Event('click'));
    await wait(201);
    await Vue.nextTick();
    expect(body.attributes().style).not.toContain('display: none');
  });

  it('should not putaway the panel when click the element in the body element', async () => {
    const body = wrapper.find('.cotton-dropdown__body');
    const elementInBody = wrapper.find('.test-in-body');
    elementInBody.element.dispatchEvent(new Event('click'));
    await wait(201);
    await Vue.nextTick();
    expect(body.attributes().style).not.toContain('display: none');
  });

  it('should putaway the panel when click the title element', async () => {
    const title = wrapper.find('.cotton-dropdown__title');
    const body = wrapper.find('.cotton-dropdown__body');
    title.element.dispatchEvent(new Event('click'));
    await wait(201);
    await Vue.nextTick();
    expect(body.attributes().style).toContain('display: none');
  });

  it('should dropdown the panel when click the element in the title element again', async () => {
    const elementInTitle = wrapper.find('.test-in-title');
    const body = wrapper.find('.cotton-dropdown__body');
    elementInTitle.element.dispatchEvent(new Event('click'));
    await wait(201);
    await Vue.nextTick();
    expect(body.attributes().style).not.toContain('display: none');
  });

  it('should putaway the panel when left the dropdown and click the place out of the dropdown', async () => {
    const container = wrapper.find('.cotton-dropdown');
    const body = wrapper.find('.cotton-dropdown__body');
    container.element.dispatchEvent(new MouseEvent('mouseleave'));
    container.element.dispatchEvent(new FocusEvent('focusout'));
    await wait(201);
    await Vue.nextTick();
    expect(body.attributes().style).toContain('display: none');
  });
});
