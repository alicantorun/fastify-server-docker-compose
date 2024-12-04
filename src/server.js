const fastify = require("fastify")({
    logger: {
        level: "debug",
        transport: {
            target: "pino-pretty",
        },
        serializers: {
            req(request) {
                return {
                    method: request.method,
                    url: request.url,
                    hostname: request.hostname,
                    remoteAddress: request.ip,
                    remotePort: request.socket.remotePort,
                };
            },
        },
    },
    trustProxy: true,
});

// Log all incoming requests
fastify.addHook("onRequest", (request, reply, done) => {
    console.log(
        `Incoming request from ${request.ip}: ${request.method} ${request.url}`
    );
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
            port: process.env.PORT || 3000,
            host: process.env.HOST || "0.0.0.0",
        });
        console.log(
            `Server is ready on ${process.env.HOST || "0.0.0.0"}:${
                process.env.PORT || 3000
            }`
        );
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
};

start();
