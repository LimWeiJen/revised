import sanityClient from '@sanity/client'

export const client = sanityClient({
	projectId: 'fx8wjio5',
	dataset: 'production',
	apiVersion: 'v1',
	token: 'skYil7kK3hkvT4scPKf5Vm5UVNJPC7Qlc1Q3YXGXyZSDKx8sHulypmkjasXtmUUjkepgxTKP44Af2cFbcMhqHJK2hCvuMD1T12unjS7cvfTBEqUMpX7usb5oihEsJFQ1nqOFECT47GvBxggYB9W6sCMYn3ZHdS96cuXv6Nsou8e1c7PFdMXs',
	useCdn: false
})