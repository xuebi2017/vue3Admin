export const searchOpts = {
	defaultValue: "",
	clearable: true
};
export function dialogWidth() {
	const innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (innerWidth >= 2560) {
		return "32%";
	} else if (innerWidth >= 1920) {
		return "46%";
	} else if (innerWidth >= 1680) {
		return "52%";
	} else if (innerWidth >= 1440) {
		return "60%";
	} else {
		return "70%";
	}
}
