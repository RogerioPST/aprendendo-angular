const PROXY_CONFIG = [
	{
		context: ['/api'],
		target: 'http://localhost:8000/',
		secure: false,
		logLevel: 'debug',
//vai remover o api e reescrever o endereço sem ele
		pathRewrite: {'^/api': ''}
	}
]

module.exports = PROXY_CONFIG