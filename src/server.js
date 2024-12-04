const fastify = require("fastify")({ logger: true });

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Route for GET '/'
fastify.get("/", async (request, reply) => {
    return { hello: "world" };
});

// Add health check endpoint
fastify.get("/health", async (request, reply) => {
    return { status: "ok" };
});

// Start the server
const start = async () => {
    try {
        await fastify.listen({
            port: PORT,
            host: HOST,
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
