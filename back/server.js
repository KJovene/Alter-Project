import app from './index.js'
import ENV from './config/env.js'


app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });