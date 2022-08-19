import app, { addPlugins, addRoutes } from './app';

addPlugins();
addRoutes();

app.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err.message);
    return process.exit(1);
  }
  console.log(`started at ${address}`);
});
