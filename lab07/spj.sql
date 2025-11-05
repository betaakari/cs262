--
-- This SQL script builds an Acme database, deleting any pre-existing version.
--
-- @author kvlinden
-- @version Fall, 2018
--

-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS PartJob;
DROP TABLE IF EXISTS Job;
DROP TABLE IF EXISTS Part;
DROP TABLE IF EXISTS Supplier;

-- Create the schema.
CREATE TABLE Supplier (
                          ID integer PRIMARY KEY,
                          name varchar(25),
                          loginID varchar(10) NOT NULL,
                          password varchar(20),
                          address varchar(20)
);

CREATE TABLE Part (
	ID integer PRIMARY KEY,
	name varchar(25),
	price integer, -- in cents
	supplierID integer REFERENCES Supplier(ID)
	);

CREATE TABLE Job (
                     ID integer PRIMARY KEY,
                     name varchar(25),
                     address varchar(30)
);

CREATE TABLE PartJob (
                         partID integer REFERENCES Part(ID),
                         jobID integer REFERENCES Job(ID),
                         quantity integer,
                         date DATE
);

-- Allow users to select data from the tables.
GRANT SELECT ON Supplier TO PUBLIC;
GRANT SELECT ON Part TO PUBLIC;
GRANT SELECT ON Job TO PUBLIC;
GRANT SELECT ON PartJob TO PUBLIC;

-- Add sample records.
INSERT INTO Supplier VALUES (1, 'Acme', 'acme', 'joshua', 'Grand Rapids, MI');
INSERT INTO Supplier VALUES (2, 'Ronco', 'ronc', 'ronc', 'Detroit, MI');
INSERT INTO Supplier VALUES (3, 'Popeil', 'popi', 'pp123', 'Grand Rapids, MI');

INSERT INTO Part VALUES (1, 'Birdseed', 500, 1);
INSERT INTO Part VALUES (2, 'TNT', 10000, 1);
INSERT INTO Part VALUES (3, 'Lead shot', 2000, NULL);
INSERT INTO Part VALUES (4, 'Pocket Fisherman', 1999, 3);

INSERT INTO Job VALUES (1, 'Student Union', 'Calvin');
INSERT INTO Job VALUES (2, NULL, 'Calvin');
INSERT INTO Job VALUES (3, 'Art Museum', 'Grand Rapids');

INSERT INTO PartJob VALUES (1, 1, 10, '2018-10-20');
INSERT INTO PartJob VALUES (2, 2, 2, '2018-10-21');
INSERT INTO PartJob VALUES (1, 2, 3, '2018-10-21');
INSERT INTO PartJob VALUES (4, 1, 2, '2018-10-22');
