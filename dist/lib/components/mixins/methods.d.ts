import Vue from 'vue';
import { Form } from 'element-ui';
export default class MethodsMixins extends Vue {
    cachedDataArr: any[];
    get elFormRef(): Form;
    created(): void;
    private getTarget;
    private setByField;
    private isHasByField;
    private insertByField;
    private emptysByField;
    private getByField;
    private delByField;
    private exportMethods;
}
