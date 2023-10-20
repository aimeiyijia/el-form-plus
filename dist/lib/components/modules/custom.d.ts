import Vue, { VNode, CreateElement } from 'vue';
export default class CustomPlus extends Vue {
    get customValue(): string;
    private dataChange;
    private dispatch;
    created(): void;
    render(h: CreateElement): VNode;
}
