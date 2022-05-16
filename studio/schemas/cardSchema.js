export default {
	name: 'card',
	title: 'card',
	type: 'document',
	fields: [
		{
			name: 'id',
			title: 'id',
			type: 'string'
		},
		{
			name: 'question',
			title: 'question',
			type: 'string'
		},
		{
			name: 'category',
			title: 'category',
			type: 'string'
		},
		{
			name: 'answer',
			title: 'answer',
			type: 'array',
			of: [{type: 'string'}]
		},
		{
			name: 'box',
			title: 'box',
			type: 'number'
		},
	]
}