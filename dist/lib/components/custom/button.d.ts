import { VNode } from 'vue';
import { Form } from 'element-ui';
interface IButtonsConfig {
    confirm?: boolean;
    confirmText?: string;
    reset?: boolean;
    resetText?: string;
    cancel?: boolean;
    cancelText?: string;
}
declare function renderButtons(config: IButtonsConfig): {
    type: string;
    noField: boolean;
    scopedSlots: {
        custom: ({ instance }: {
            instance: Form;
        }) => VNode;
    };
    config: {
        col: {
            span: number;
        };
    };
};
export default renderButtons;
