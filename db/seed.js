import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const mockEmployees = [
    { name: "Jim Halpert", birthday: "1978-10-01", salary: 60000 },
    { name: "Pam Beesly", birthday: "1979-03-25", salary: 50000 },
    { name: "Dwight Schrute", birthday: "1970-01-20", salary: 70000 },
    { name: "Michael Scott", birthday: "1965-03-15", salary: 80000 },
    { name: "Angela Martin", birthday: "1971-06-25", salary: 65000 },
    { name: "Kevin Malone", birthday: "1968-07-12", salary: 55000 },
    { name: "Oscar Martinez", birthday: "1958-11-18", salary: 75000 },
    { name: "Stanley Hudson", birthday: "1951-09-02", salary: 72000 },
    { name: "Phyllis Vance", birthday: "1960-04-14", salary: 62000 },
    { name: "Kelly Kapoor", birthday: "1980-02-05", salary: 45000 }
  ];

  for (const employee of mockEmployees) {
    await createEmployee(employee);
  }
}