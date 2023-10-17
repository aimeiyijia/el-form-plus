import Vue, { VNode, CreateElement } from 'vue';
import '../directives/thousands';
export default class InputPlus extends Vue {
    customInput(val: any): void;
    get digitExit(): string | boolean;
    get digitConfig(): any;
    get hasDirectives(): any;
    get directives(): {
        name: string;
        value: any;
    }[];
    get listeners(): Record<string, Function | Function[]>;
    render(h: CreateElement): VNode;
}
