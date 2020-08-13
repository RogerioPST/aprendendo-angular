# Server para upload de arquivos
- [x] - Anotações
- [ ] - complementar

## Anotações:
<ol>
<li>
comandos via linha de comando:
<ul>
<li>npm i -save express 
body-parser connect-multiparty cors</li>
<li>npm run start</li>
</ul>
</li>arquivo index.js com o cors permitindo acesso no backend
<li>

```javascript
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

const corsOptions = {
	origin: '*', 
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const multipartMiddleware = multiparty({ uploadDir: './uploads'})
app.post('/upload', multipartMiddleware,(req,resp) =>{
	const files = req.files
	console.log(files)
	resp.json({message: files})
})

app.use((err, req, res, next) => res.json({error: err.message}))


app.listen(8000, () =>{
	console.log('ouvindo na porta 8000')
})
```
</li>
</ol>

