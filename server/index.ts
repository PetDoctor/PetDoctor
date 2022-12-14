import 'dotenv/config';
import { app } from './src/app';

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`π‘ ######################################################
####### μ μμ μΌλ‘ μλ²λ₯Ό μμνμμ΅λλ€.   ${PORT} #######`);
});

///mongoose μ°κ²°
import mongoose from 'mongoose';

const DB_URL =
  process.env.MONGODB_URL ||
  'MongoDB μλ² μ£Όμκ° μ€μ λμ§ μμμ΅λλ€.\n./db/index.ts νμΌμ νμΈν΄ μ£ΌμΈμ. \n.env νμΌλ νμν©λλ€.\n';

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () =>
  console.log('####### μ μμ μΌλ‘ MongoDB μλ²μ μ°κ²°λμμ΅λλ€.π#######')
);
db.on('error', (error) =>
  console.error('\nMongoDB μ°κ²°μ μ€ν¨νμμ΅λλ€...\n' + '\n' + error)
);
