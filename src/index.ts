import config from "./config/dbConfig";
import sql from "mssql";
import connectMongoDB from "./config/dbConfigMongo";
import { CronJob } from "./modules/cron/cronJob";

const conectarSql = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("✅ Conexión exitosa a la base de Datos SQL Server");
    await pool.close(); // Cerrar la conexión después de la prueba
    return true;
  } catch (error) {
    console.log("❌❌ Fallor en la conexión con Sql Server",error); 
    return false;
    }
}

const main = async () => {
    /*
    * Conexión a Mongo DB
    */
    const conectoMongo = await connectMongoDB();    
    /*
    * Conexión a la base de datos SQL Server
    */
    const conectoSql = await conectarSql();
    if (conectoMongo && conectoSql) {
      console.log("🚀🚀🚀 Conexiones exitosas 🚀🚀🚀");
  
      // Iniciar el cron después de que las conexiones sean exitosas
      const cronJob = new CronJob();
      cronJob.start();
      console.log("⏳ CronJob iniciado...");
    } else {
      console.log("❌❌❌ Fallaron las conexiones ❌❌❌");
    }

  
};

main();
