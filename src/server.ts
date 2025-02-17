// Entry point of the application.
// Starts the server and listens for incoming requests.

import { app } from './app';
import { PORT } from './config/config';

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
