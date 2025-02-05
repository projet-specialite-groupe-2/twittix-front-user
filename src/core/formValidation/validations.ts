export const requireRule = (text: string) => [(v?: string) => !!v || text]
export const minRule = (text: string, min: number) => [
	(v: string) => (v ? v.length >= min || text : text),
]
export const requireArrayLengthRule = (text: string) => [
	(v?: Array<unknown>) => !!v?.length || text,
]
