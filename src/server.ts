import { fastify } from "fastify";

const app = fastify()

app.get('/unipar', () => {
    return 'Ola FASTIFY'
})