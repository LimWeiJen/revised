export default {
	name: 'user',
	type: 'document',
	title: 'user',
	fields: [
		{
			name: 'id',
			type: 'string',
			title: 'id'
		},
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
				type: 'reference',
				to: [{type: 'card'}]
			}]
		}
	]
}