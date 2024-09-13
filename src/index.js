const app = require('./app');

const port = process.env.PORT_APP || 3000;

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});
