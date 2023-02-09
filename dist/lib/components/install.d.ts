import { PluginFunction } from 'vue';
import { setByField, isHasByField, insertByField, emptysByField, getByField, delByField } from './utils/opera';
interface InstallFunction extends PluginFunction<any> {
    installed?: boolean;
}
declare const install: InstallFunction;
export { setByField, isHasByField, insertByField, emptysByField, getByField, delByField, };
export default install;
