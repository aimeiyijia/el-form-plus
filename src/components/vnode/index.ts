import {
  SelectTreeBase,
  AutocompleteBase,
  CascaderBase,
  CascaderPanelBase,
  CheckBoxBase,
  ColorPickerBase,
  CustomBase,
  DatePickerBase,
  DateTimePickerBase,
  InputNumberBase,
  InputBase,
  RadioBase,
  RateBase,
  SelectBase,
  SliderBase,
  SuperCustomBase,
  SwitchBase,
  TimePickerBase,
  TimeSelectrBase,
  TransferBase,
  TreeBase,
  UploadBase,
} from '../modules'

import {
  SelectTreeDetail,
  AutocompleteDetail,
  CascaderDetail,
  CascaderPanelDetail,
  CheckBoxDetail,
  ColorPickerDetail,
  CustomDetail,
  DatePickerDetail,
  DateTimePickerDetail,
  InputNumberDetail,
  InputDetail,
  RadioDetail,
  RateDetail,
  SelectDetail,
  SliderDetail,
  SuperCustomDetail,
  SwitchDetail,
  TimePickerDetail,
  TimeSelectrDetail,
  TransferDetail,
  TreeDetail,
  UploadDetail,
} from '../modules/desc-detail'
const Vnodes = {
  SelectTree: SelectTreeBase,
  Autocomplete: AutocompleteBase,
  Cascader: CascaderBase,
  CascaderPanel: CascaderPanelBase,
  CheckBox: CheckBoxBase,
  ColorPicker: ColorPickerBase,
  Custom: CustomBase,
  DatePicker: DatePickerBase,
  DateTimePicker: DateTimePickerBase,
  InputNumber: InputNumberBase,
  Input: InputBase,
  Radio: RadioBase,
  Rate: RateBase,
  Select: SelectBase,
  Slider: SliderBase,
  Switch: SwitchBase,
  TimePicker: TimePickerBase,
  TimeSelect: TimeSelectrBase,
  Transfer: TransferBase,
  Tree: TreeBase,
  Upload: UploadBase,
}
const DetailVnodes = {
  SelectTree: SelectTreeDetail,
  Autocomplete: AutocompleteDetail,
  Cascader: CascaderDetail,
  CascaderPanel: CascaderPanelDetail,
  CheckBox: CheckBoxDetail,
  ColorPicker: ColorPickerDetail,
  Custom: CustomDetail,
  DatePicker: DatePickerDetail,
  DateTimePicker: DateTimePickerDetail,
  InputNumber: InputNumberDetail,
  Input: InputDetail,
  Radio: RadioDetail,
  Rate: RateDetail,
  Select: SelectDetail,
  Slider: SliderDetail,
  Switch: SwitchDetail,
  TimePicker: TimePickerDetail,
  TimeSelect: TimeSelectrDetail,
  Transfer: TransferDetail,
  Tree: TreeDetail,
  Upload: UploadDetail,
}

export const SuperCustom = SuperCustomBase

export { Vnodes, DetailVnodes }
