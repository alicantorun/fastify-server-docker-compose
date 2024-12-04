const fastify = require("fastify")({
    logger: true,
});

// Simple configuration without environment variables first
fastify.listen(
    {
        port: 3000,
        host: "0.0.0.0",
    },
    (err, address) => {
        if (err) {
            console.error("Error starting server:", err);
            process.exit(1);
        }
        console.log(`Server is now listening on ${address}`);
    }
);

// Routes
fastify.get("/", async () => {
    return { hello: "world" };
});

fastify.get("/health", async () => {
    return { status: "ok" };
});
