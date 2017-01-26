const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://chandan:duvarko315@localhost:5432/diary';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  //'CREATE TABLE Entries(id SERIAL PRIMARY KEY, text VARCHAR(500) not null, category integer not null, dateEntered Date not null, username VARCHAR(20) not null)'
  //'CREATE TABLE Categories(id SERIAL PRIMARY KEY, text VARCHAR(50) not null, username VARCHAR(20) not null)'
  //'CREATE TABLE Users(id SERIAL PRIMARY KEY, username VARCHAR(20) UNIQUE not null, password VARCHAR(20) not null)'
  );
query.on('end', () => { client.end(); });