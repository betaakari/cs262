-- Get the number of suppliers.
SELECT COUNT(*)
FROM Supplier
;

-- Get all data on all suppliers.
SELECT *
FROM Supplier
;

-- Get the loginIDs for a stupid password.
SELECT loginID
FROM Supplier
WHERE password = 'joshua'
;

-- Get jobs without names.
SELECT *
FROM Job
WHERE name IS NULL
;
