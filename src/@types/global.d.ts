import type { UploadUserFile } from "element-plus";

declare global {
	// *Dict
	interface DictOptions {
		key: string;
		value: string;
	}

	// * Menu
	namespace Menu {
		interface MenuOptions {
			// indocno: number;
			// iparent: number;
			// isort: number;
			// menu_icon: string;
			// menu_level: number;
			// menu_name: string;
			// menu_url: string;
			// sparent: string;
			// child?: MenuOptions[];
			path: string;
			name: string;
			component?: string | (() => Promise<any>);
			redirect?: string;
			meta: MetaProps;
			children?: MenuOptions[];
		}
		interface MetaProps {
			icon: string;
			title: string;
			activeMenu?: string;
			isLink?: string;
			isHide: boolean;
			isFull: boolean;
			isAffix: boolean;
			isKeepAlive: boolean;
		}
	}

	//*User
	namespace User {
		interface RoleOptions {
			indocno: number;
			iline: number;
			sline: string;
			role_code: string;
			role_name: string;
			menu_ids: string | null;
		}
		interface UserInfo {
			indocno: number;
			account: string;
			password: string;
			photo: string | null;
			sname: string;
			sex: string | null;
			productLines: DictOptions[];
			sysRole: RoleOptions[];
		}
	}

	// *Login Token
	interface LoginToken {
		userId: number;
		sname: string;
	}

	//table
	namespace Table {
		interface TableOptions {
			colums: ColumProps[];
			tableData: Array;
		}
		interface ColumProps {
			field: string;
			label: string;
			type?: string;
			width?: string | number;
			search?: SearchProps;
			props?: any;
			options?: Array;
			showOverflowTooltip?: boolean;
			fixed?: boolean;
			formatter?: function;
			children?: ColumProps[];
		}
		interface SearchProps {
			render?: Function;
			defaultValue: string | number | boolean;
			clearable: boolean;
		}
	}

	//search
	interface Search {
		pageSize: number;
		pageIndex: number;
		condition?: Record<string, any>;
	}
	//searchForm
	namespace SearchForm {
		interface SearchFormOptions extends Form.FormOptions {
			showOperate?: boolean;
			showSearch?: boolean;
			showReset?: boolean;
			showCollapse?: boolean;
		}
	}

	//form
	namespace Form {
		interface FormOptions {
			disabled?: boolean;
			inline?: boolean;
			rules?: Record<string, any>;
			data?: Record<string, any>;
			labelWidth?: number | string;
			fieldArray?: FieldProps[];
			showFooter?: boolean;
			submit?: function;
		}
		interface FieldProps {
			field: string;
			label: string;
			type: string;
			textareaWidth?: string | number;
			autosize?: boolean;
			rows?: number;
			querySearchAsync?: function;
			disabled?: boolean;
			options?: DictOptions[];
			labelWidth?: number | string;
		}
	}

	//dialog
	namespace Dialog {
		interface DialogOptions {
			title?: string;
			width?: string | number;
			visible?: Ref<boolean>;
			hide: function;
			ok: function;
		}
	}

	// * FileType
	namespace File {
		type ImageMimeType =
			| "image/apng"
			| "image/bmp"
			| "image/gif"
			| "image/jpeg"
			| "image/pjpeg"
			| "image/png"
			| "image/svg+xml"
			| "image/tiff"
			| "image/webp"
			| "image/x-icon";
		type ExcelMimeType = "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	}
	//uploadFile
	interface UploadFileProps {
		fileList: UploadUserFile[];
		api?: (params: any) => Promise<any>; // 上传图片的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
		drag?: boolean; // 是否支持拖拽上传 ==> 非必传（默认为 true）
		disabled?: boolean; // 是否禁用上传组件 ==> 非必传（默认为 false）
		limit?: number; // 最大图片上传数 ==> 非必传（默认为 5张）
		fileSize?: number; // 图片大小限制 ==> 非必传（默认为 5M）
		fileType?: File.ImageMimeType[]; // 图片类型限制 ==> 非必传（默认为 ["image/jpeg", "image/png", "image/gif"]）
		height?: string; // 组件高度 ==> 非必传（默认为 150px）
		width?: string; // 组件宽度 ==> 非必传（默认为 150px）
		borderRadius?: string; // 组件边框圆角 ==> 非必传（默认为 8px）
	}
}

export {};
