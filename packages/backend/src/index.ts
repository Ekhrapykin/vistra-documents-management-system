import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import { load as yamlLoad } from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import router from './router';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

const swaggerSpec = yamlLoad(fs.readFileSync('./src/swagger.yaml', 'utf8')) as any;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Vistra DMS API' });
});

app.use('/api/dms', router);

app.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
