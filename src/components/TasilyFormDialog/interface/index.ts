import type { FormRules } from "element-plus";
export interface FormDialog {
	visible?: boolean; //弹窗显示和隐藏
	showFooter?: boolean; //footer显示和隐藏
	fullScreen?: boolean; //是否全屏
	title?: string; //弹窗标题
	width?: string | number; //弹窗宽度
	disabled?: boolean; //表单是否禁用
	rules?: FormRules; //表单填写规则
	data?: {
		[k: string]: any;
	}; //表单数据
	inline?: boolean; //表单inline
	labelWidth?: number | string; //表单label宽度
	fieldArray: Array<Form.FieldProps>; //表单元素
	ok?: Function; //确认按钮
	hide?: Function; //取消按钮
}
