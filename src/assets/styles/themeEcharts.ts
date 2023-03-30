const themeEcharts = {
	color: [
		"#3088F4",
		"#FFC720",
		"#e7bcf3",
		"#32c5e9",
		"#ffdb5c",
		"#9fe6b8",
		"#e690d1",
		"#9d96f5",
		"#67e0e3",
		"#96bfff",
		"#37a2da",
		"#e062ae",
		"#8378ea",
		"#ff9f7f",
		"#fb7293"
	],
	backgroundColor: "rgba(252,252,252,0)",
	textStyle: {
		color: "#333"
	},
	title: {
		textStyle: {
			color: "#333",
			fontSize: 14
		},
		left: 10,
		subtextStyle: {
			color: "#999999"
		}
	},
	line: {
		itemStyle: {
			borderWidth: "2"
		},
		lineStyle: {
			normal: {
				width: "3"
			}
		},
		symbolSize: "8",
		symbol: "emptyCircle",
		smooth: false
	},
	radar: {
		itemStyle: {
			borderWidth: "2"
		},
		lineStyle: {
			normal: {
				width: "3"
			}
		},
		symbolSize: "8",
		symbol: "emptyCircle",
		smooth: false
	},
	bar: {
		itemStyle: {
			barBorderWidth: 0,
			barBorderColor: "#ccc"
		},
		emphasis: {
			itemStyle: {
				barBorderWidth: 0,
				barBorderColor: "#ccc"
			}
		}
	},
	pie: {
		itemStyle: {
			borderWidth: 0,
			borderColor: "#ccc"
		},
		emphasis: {
			itemStyle: {
				barBorderWidth: 0,
				barBorderColor: "#ccc"
			}
		}
	},
	scatter: {
		itemStyle: {
			borderWidth: 0,
			borderColor: "#ccc"
		},
		emphasis: {
			itemStyle: {
				barBorderWidth: 0,
				barBorderColor: "#ccc"
			}
		}
	},
	boxplot: {
		itemStyle: {
			borderWidth: 0,
			borderColor: "#ccc"
		},
		emphasis: {
			itemStyle: {
				barBorderWidth: 0,
				barBorderColor: "#ccc"
			}
		}
	},
	parallel: {
		itemStyle: {
			borderWidth: 0,
			borderColor: "#ccc"
		},
		emphasis: {
			itemStyle: {
				barBorderWidth: 0,
				barBorderColor: "#ccc"
			}
		}
	},
	sankey: {
		itemStyle: {
			borderWidth: 0,
			borderColor: "#ccc"
		},
		emphasis: {
			itemStyle: {
				barBorderWidth: 0,
				barBorderColor: "#ccc"
			}
		}
	},
	funnel: {
		itemStyle: {
			borderWidth: 0,
			borderColor: "#ccc"
		},
		emphasis: {
			itemStyle: {
				barBorderWidth: 0,
				barBorderColor: "#ccc"
			}
		}
	},
	gauge: {
		itemStyle: {
			borderWidth: 0,
			borderColor: "#ccc"
		},
		emphasis: {
			itemStyle: {
				barBorderWidth: 0,
				barBorderColor: "#ccc"
			}
		}
	},
	candlestick: {
		itemStyle: {
			color: "#e6a0d2",
			color0: "transparent",
			borderColor: "#e6a0d2",
			borderColor0: "#3fb1e3",
			borderWidth: "2"
		}
	},
	graph: {
		itemStyle: {
			borderWidth: 0,
			borderColor: "#ccc"
		},
		lineStyle: {
			normal: {
				width: "1",
				color: "#cccccc"
			}
		},
		symbolSize: "8",
		symbol: "emptyCircle",
		smooth: false,
		color: [
			"#37a2da",
			"#e062ae",
			"#8378ea",
			"#ffdb5c",
			"#9fe6b8",
			"#ff9f7f",
			"#fb7293",
			"#32c5e9",
			"#e690d1",
			"#e7bcf3",
			"#9d96f5",
			"#67e0e3",
			"#96bfff"
		],
		label: {
			color: "#333"
		}
	},
	map: {
		itemStyle: {
			areaColor: "#eeeeee",
			borderColor: "#aaaaaa",
			borderWidth: 0.5
		},
		emphasis: {
			label: {
				color: "#3fb1e3"
			},
			itemStyle: {
				areaColor: "rgba(63,177,227,0.25)",
				borderColor: "#3fb1e3",
				borderWidth: 1
			}
		},
		label: {
			color: "#ffffff"
		}
	},
	geo: {
		itemStyle: {
			areaColor: "#eeeeee",
			borderColor: "#aaaaaa",
			borderWidth: 0.5
		},
		emphasis: {
			label: {
				color: "#3fb1e3"
			},
			itemStyle: {
				areaColor: "rgba(63,177,227,0.25)",
				borderColor: "#3fb1e3",
				borderWidth: 1
			}
		},
		label: {
			color: "#ffffff"
		}
	},
	categoryAxis: {
		axisLine: {
			show: true,
			lineStyle: {
				color: "#333"
			}
		},
		axisTick: {
			show: false,
			lineStyle: {
				color: "#333"
			}
		},
		axisLabel: {
			show: true,
			color: "#333"
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: ["#ddd"]
			}
		},
		splitArea: {
			show: false,
			areaStyle: {
				color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]
			}
		}
	},
	valueAxis: {
		axisLine: {
			show: true,
			lineStyle: {
				color: "#333"
			}
		},
		axisTick: {
			show: false,
			lineStyle: {
				color: "#333"
			}
		},
		axisLabel: {
			show: true,
			color: "#333"
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: ["#ddd"]
			}
		},
		splitArea: {
			show: false,
			areaStyle: {
				color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]
			}
		}
	},
	logAxis: {
		axisLine: {
			show: true,
			lineStyle: {
				color: "#333"
			}
		},
		axisTick: {
			show: false,
			lineStyle: {
				color: "#333"
			}
		},
		axisLabel: {
			show: true,
			color: "#333"
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: ["#ddd"]
			}
		},
		splitArea: {
			show: false,
			areaStyle: {
				color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]
			}
		}
	},
	timeAxis: {
		axisLine: {
			show: true,
			lineStyle: {
				color: "#333"
			}
		},
		axisTick: {
			show: false,
			lineStyle: {
				color: "#333"
			}
		},
		axisLabel: {
			show: true,
			color: "#333"
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: ["#ddd"]
			}
		},
		splitArea: {
			show: false,
			areaStyle: {
				color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]
			}
		}
	},
	toolbox: {
		emphasis: {
			iconStyle: {
				borderColor: "#666666"
			}
		},
		iconStyle: {
			borderColor: "#999999"
		}
	},
	legend: {
		textStyle: {
			color: "#333"
		}
	},
	tooltip: {
		show: true,
		trigger: "axis",
		axisPointer: {
			type: "cross",
			lineStyle: {
				color: "#cccccc",
				width: 1
			},
			crossStyle: {
				color: "#cccccc",
				width: 1
			}
		}
	},
	timeline: {
		lineStyle: {
			color: "#626c91",
			width: 1
		},
		itemStyle: {
			color: "#626c91",
			borderWidth: 1
		},
		emphasis: {
			itemStyle: {
				color: "#626c91"
			},
			controlStyle: {
				label: {
					color: "#626c91"
				},
				color: "#626c91",
				borderColor: "#626c91",
				borderWidth: 0.5
			}
		},
		controlStyle: {
			color: "#626c91",
			borderColor: "#626c91",
			borderWidth: 0.5
		},
		checkpointStyle: {
			color: "#3fb1e3",
			borderColor: "rgba(63,177,227,0.15)"
		},
		label: {
			color: "#626c91"
		}
	},
	visualMap: {
		color: ["#2a99c9", "#afe8ff"]
	},
	dataZoom: {
		backgroundColor: "rgba(255,255,255,0)",
		dataBackgroundColor: "rgba(222,222,222,1)",
		fillerColor: "#f8f8f9",
		handleColor: "#cccccc",
		handleIcon: "path://M159.336,430.669v-24.834h30.493v24.834l-15.248,8.544L159.336,430.669z",
		handleSize: "100%",
		borderWidth: 2,
		borderColor: "transparent",
		shadowBlur: 8,
		shadowColor: "transparent",
		textStyle: {
			color: "#999999"
		}
	},
	markPoint: {
		label: {
			color: "#333"
		},
		emphasis: {
			label: {
				color: "#333"
			}
		}
	}
};

export default themeEcharts;
