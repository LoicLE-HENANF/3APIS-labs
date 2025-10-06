import mongoose from 'mongoose';
// pensez à loader la config .env avec dotenv avant d'importer ce module
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const dbName = process.env.MONGODB_DBNAME;
  if (!uri) throw new Error('MONGODB_URI non défini');
  if (!user) throw new Error('MONGODB_USER non défini');
  if (!password) throw new Error('MONGODB_PASSWORD non défini');
  if (!dbName) throw new Error('MONGODB_DBNAME non défini');
  const authUri = uri.replace('<username>', encodeURIComponent(user))
                     .replace('<password>', encodeURIComponent(password))
                     .replace('<dbname>', encodeURIComponent(dbName));
  console.log('Connexion à MongoDB...');
  await mongoose.connect(authUri).then(() =>{
    console.log('Connecté à MongoDB');
  }).catch(err=>{
    console.error('Erreur de connexion MongoDB:', err);
    process.exit(1);
  })
}