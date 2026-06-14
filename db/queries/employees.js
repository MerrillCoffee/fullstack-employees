import db from "../client.js";

export async function createEmployee({ name, birthday, salary }) {
  const { rows } = await db.query(
    `INSERT INTO employees (name, birthday, salary) 
     VALUES ($1, $2, $3) 
     RETURNING *;`,
    [name, birthday, salary]
  );
  
  return rows[0];
}
