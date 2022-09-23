import { Button } from 'element-ui';
import { DatePicker } from 'element-ui';
import { Form } from 'element-ui';
import { FormItem } from 'element-ui';
import { Input } from 'element-ui';
import { Option as Option_2 } from 'element-ui';
import { Select } from 'element-ui';

declare type confirmCallback = {
  onConfirm?: () => Promise<void>;
};

declare type confirmProps = {
  title?: string;
  content?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnClickModal?: boolean;
};

declare namespace CONSTANS {
  export { INPUT_TYPE, SELECT_TYPE, DATE_TYPE, DATERANGE_TYPE };
}
export { CONSTANS };

export declare const createConfirm: (params: confirmProps) => (callback?: confirmCallback | undefined) => Promise<void>;

declare const DATE_TYPE = 'date';

declare const DATERANGE_TYPE = 'daterange';

export declare const Filter: {
  name: string;
  components: {
    ElementInput: typeof Input;
    ElementSelect: typeof Select;
    ElementOption: typeof Option_2;
    DatePicker: typeof DatePicker;
    ElementForm: typeof Form;
    FormItem: typeof FormItem;
  };
  props: {
    columns: {
      type: boolean;
      default(): never[];
    };
  };
  data: () => {
    values: {};
  };
  methods: {
    getValues: () => any;
    reset: () => Promise<void>;
  };
};

declare const INPUT_TYPE = 'input';

export declare const LoadableButton: {
  name: string;
  components: {
    ElementButton: typeof Button;
  };
  props: {
    onClick: {
      type: FunctionConstructor;
      default: () => Promise<undefined>;
    };
    interval: {
      type: NumberConstructor;
      default: number;
    };
    delayToTrigger: {
      type: NumberConstructor;
      default: number;
    };
  };
  data: () => {
    loading: boolean;
    delay: number;
    timer: number;
  };
  mounted: () => void;
  unmounted: () => void;
  methods: {
    onTriggerClick: (...args: unknown[]) => Promise<void>;
    countdown: () => void;
  };
};

declare const SELECT_TYPE = 'select';

export {};
