import { PrismaClient } from "@prisma/client";
import { fastify } from "fastify";
import { z } from "zod";

const app = fastify()

const prisma = new PrismaClient();


app.post('/criarEnquete', async (request, reply) => {

const requestBody = z.object(
    {
        titulo : z.string(),
        descricao : z.string(),
        opcoesEnquete: z.array(z.string())
    }
)
const enquete = requestBody.parse(request.body)

const enqueteCriada = await prisma.enquete.create({
    data : enquete
})

await prisma.opcaoEnquete.createMany({
    data : enquete.opcoesEnquete.map(opcao => {
        return {
            descricao : opcao,
            enqueteCodigo: enqueteCriada.codigo
        }
    })
})

return reply.status(201).send(enqueteCriada);
})

app.listen({port: 3333}).then( () => {
    console.log('SERVIDOR RODANDO')
})