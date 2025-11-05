This is a reference implementation of a Suppliers-Parts-Jobs (SPJ) database.
It is similar, but not identical, to the SPJ database used in Calvin College
CS 262 [class 8](https://cs.calvin.edu/courses/cs/262/kvlinden/08is/class.html).

# SPJ Database — CS 262 Lab 08

This folder contains a reference implementation of a **Suppliers–Parts–Jobs (SPJ)** database.

It is similar, but not identical, to the SPJ database used in Calvin University  
CS 262 class 8 (SQL examples).

---

## Files

- **spj.sql**  
  Builds the SPJ database schema and inserts some sample data:

  - `Supplier` — suppliers with an `id`, `name`, and `status`.
  - `Part` — parts with an `id`, `name`, `color`, and `weight`.
  - `Job` — jobs with an `id`, `name`, and `city`.
  - `SPJ` — transactions connecting suppliers, parts, and jobs, with:
    - `sid` → references `Supplier(id)`
    - `pid` → references `Part(id)`
    - `jid` → references `Job(id)`
    - `transDate` → date of the transaction
    - `quantity` → how many parts were supplied

The script also includes several `INSERT` statements to populate the tables with example data.

---

## Creating the SPJ Database in PostgreSQL

From the terminal, in the folder that contains `spj.sql`, run:

```bash
psql -d spj -f spj.sql
