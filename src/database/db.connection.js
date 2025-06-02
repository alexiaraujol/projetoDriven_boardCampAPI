import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg; 

const configDatabase = {
    conectionString: process.env.DATABASE_URL
}

export const db = new Pool(configDatabase);