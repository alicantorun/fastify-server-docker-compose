const fastify = require("fastify")({
    logger: {
        level: "debug",
        transport: {
            target: "pino-pretty",
        },
    },
    trustProxy: true,
});

// Log all incoming requests
fastify.addHook("onRequest", (request, reply, done) => {
    console.log(`Incoming request: ${request.method} ${request.url}`);
    done();
});

fastify.get("/", async (request, reply) => {
    console.log("Handling root request");
    return { hello: "world" };
});

fastify.get("/health", async (request, reply) => {
    console.log("Handling health check");
    return { status: "ok" };
});

const start = async () => {
    try {
        await fastify.listen({
            port: 3000,
            host: "0.0.0.0",
        });
        console.log("Server is ready to handle requests");
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
};

start();
