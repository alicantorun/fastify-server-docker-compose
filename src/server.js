const fastify = require("fastify")({ logger: true });

// Route for GET '/'
fastify.get("/", async (request, reply) => {
    return { hello: "world" };
});

// Start the server
const start = async () => {
    try {
        await fastify.listen({
            port: 3000,
            host: "0.0.0.0",
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();