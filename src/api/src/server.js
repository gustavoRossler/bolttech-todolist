import app from "./app.js";

const PORT = process.env.API_PORT ?? 3008;

export const JWT_SECRET = process.env.JWT_SECRET ?? 'ahsdhaonjknvxc';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});