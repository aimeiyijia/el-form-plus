import Vue, { VNode, CreateElement } from 'vue';
export default class InputPlus extends Vue {
    allowThosands: boolean;
    customInput(val: any): void;
    customFocus(e: Event): void;
    customBlur(e: Event): void;
    get digitExit(): string | boolean;
    get digitConfig(): any;
    get hasDirectives(): any;
    get directives(): {
        name: string;
        value: any;
    }[];
    get listeners(): Record<string, Function | Function[]>;
    renderValue(): string;
    render(h: CreateElement): VNode;
}
