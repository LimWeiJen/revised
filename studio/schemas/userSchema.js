export default {
	name: 'user',
	type: 'document',
	title: 'user',
	fields: [
		{
			name: 'name',
			type: 'string',
			title: 'name'
		},
		{
			name: 'password',
			type: 'string',
			title: 'password'
		},
		{
			name: 'cards',
			title: 'cards',
			type: 'array',
			of: [{
				type: 'document',
				name: 'card',
				title: 'card',
				fields: [
					{
						name: 'question',
						title: 'question',
						type: 'string'
					},
					{
						name: 'answer',
						title: 'answer',
						type: 'string'
					},
					{
						name: 'box',
						title: 'box',
						type: 'number'
					},
				]
			}]
		}
	]
}