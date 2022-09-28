declare module '*.vue' {
  import Vue from 'vue';
  import {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
    ThisTypedComponentOptionsWithRecordProps,
  } from 'vue/types/options';

  Vue.extend(
    {} as ThisTypedComponentOptionsWithRecordProps<
      Vue,
      DefaultData<any>,
      DefaultMethods<any>,
      DefaultComputed<any>,
      DefaultProps<any>
    >
  );

  export default Vue;
}
