import { describe, expect, it } from 'vitest';

describe('E2E for the bundle result', () => {
  it('should have a LoadableButton component', async () => {
    const { LoadableButton } = await import('../');
    const ESLoadableButton = await import('../lib/es/LoadableButton');
    const CJSLoadableButton = await import('../lib/cjs/LoadableButton');
    expect(LoadableButton).not.toBeUndefined();
    expect(ESLoadableButton).not.toBeUndefined();
    expect(CJSLoadableButton).not.toBeUndefined();
  });

  it('should have a FilterCombox component', async () => {
    const { FilterCombox } = await import('../');
    const ESFilterCombox = await import('../lib/es/LoadableButton');
    const CJSFilterCombox = await import('../lib/cjs/LoadableButton');
    expect(FilterCombox).not.toBeUndefined();
    expect(ESFilterCombox).not.toBeUndefined();
    expect(CJSFilterCombox).not.toBeUndefined();
  });

  it('should have a Table component', async () => {
    const { Table } = await import('../');
    const ESTable = await import('../lib/es/Table');
    const CJSTable = await import('../lib/cjs/Table');
    expect(Table).not.toBeUndefined();
    expect(ESTable).not.toBeUndefined();
    expect(CJSTable).not.toBeUndefined();
  });

  it('should have a createConfirm component', async () => {
    const { createConfirm } = await import('../');
    expect(createConfirm).not.toBeUndefined();
  });
});
