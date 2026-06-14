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

export async function getEmployees() {
  const { rows } = await db.query("SELECT * FROM employees;");
  return rows;
}

export async function getEmployee(id) {
  const { rows } = await db.query("SELECT * FROM employees WHERE id = $1;", [id]);
  return rows[0];
}

export async function updateEmployee({ id, name, birthday, salary }) {
  const { rows } = await db.query(
    `UPDATE employees 
     SET name = $1, birthday = $2, salary = $3 
     WHERE id = $4 
     RETURNING *;`,
    [name, birthday, salary, id]
  );
  return rows[0];
}

export async function deleteEmployee(id) {
  const { rows } = await db.query("DELETE FROM employees WHERE id = $1 RETURNING *;", [id]);
  return rows[0];
}