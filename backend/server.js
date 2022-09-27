const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));

let posts = [
    // {id: 1, content: 'Первый пост', created: 1610217121849},
    // {id: 2, content: 'Второй пост', created: '2022-08-10'},
    // {id: 3, content: 'Третий пост', created: '2022-08-08'},
];
let nextId = 1;

const router = new Router();

router.get('/posts/:id', (ctx, next) => {
    const postId = Number(ctx.params.id);
    const post = posts.find(o => o.id === postId);
    ctx.response.body = post;
});

router.get('/posts', async (ctx, next) => {
    ctx.response.body = posts;
});

router.post('/posts', async(ctx, next) => {
    const body = JSON.parse(ctx.request.body);
    const {id, content} = body;

    if (id !== 0) {
        posts = posts.map(o => o.id !== id ? o : {...o, content: content});
        ctx.response.status = 204;
        return;
    }
    
    posts.unshift({...body, id: nextId++, created: Date.now()});
    ctx.response.status = 204;
});

router.delete('/posts/:id', async(ctx, next) => {
    const postId = Number(ctx.params.id);
    const index = posts.findIndex(o => o.id === postId);
    if (index !== -1) {
        posts.splice(index, 1);
    }
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));