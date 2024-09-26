CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL
);

INSERT INTO users(username, password) VALUES
('tungdv1', 'tung2462003'),
('tungdv2', '123456')

SELECT MD5('tung2462003');
SELECT MD5('tt456903');
-- mã hóa pass "9067ca6b703d8dfaed6d14ad6fec5a05"

INSERT INTO users(username,password) VALUES 
('tungdv1', MD5('123456')),
('tungdv2', MD5('tung2462003')),
('tungdv3', MD5('tt456903'))

SELECT * FROM users 
WHERE password LIKE MD5('tt456903')

DELETE FROM users

ALTER TABLE users ADD COLUMN createdate DATE 

ALTER TABLE users
ALTER COLUMN createdate SET NOT NULL DEFAULT CURRENT_DATE

SELECT * FROM users 
WHERE createdate < '07-10-2024' 
-- date(yyyy-mm-yy)

SELECT TO_CHAR(createdate, 'dd/mm/yyyy') FROM users
--  TO_CHAR(name, 'type') : ép kiểu cột kiểu date theo ý muốn khi select

SELECT * FROM users 
WHERE username LIKE 'tungdv1'
AND createdate < '07-10-2024 ' 

DELETE FROM users 
WHERE username LIKE 'tungdv111'

UPDATE users 
SET username = 'tungdv111', password = MD5(null)
WHERE id = 10

INSERT INTO users(username, password) VALUES ('tung',MD5('123'));

SELECT * FROM users WHERE username LIKE 'tungdv1'
SELECT * FROM users WHERE id = 22

CREATE TABLE roles(
id SERIAL PRIMARY KEY
, namerole VARCHAR(50) NOT NULL
, createuser BOOLEAN NOT NULL
, updateuser BOOLEAN NOT NULL
, deleteuser BOOLEAN NOT NULL
);

ALTER TABLE users ADD COLUMN roleid INT

INSERT INTO roles(namerole, createuser, updateuser, deleteuser) VALUES
('ROOT', true, true, true),
('ADMIN',true, true, true),
('USER',false, false, false),
('GUEST', false, false, false);

SELECT * FROM roles

ALTER TABLE users
ADD CONSTRAINT fk_roleid FOREIGN KEY (roleid) REFERENCES roles(id)

SELECT users.id, users.username, roles.id, roles.namerole FROM users
INNER JOIN roles ON users.roleid = roles.id

SELECT roles.createuser FROM users 
INNER JOIN roles ON users.roleid = roles.id
WHERE users.id = 20;

SELECT roles.id FROM roles
LEFT JOIN users on users.roleid = roles.id
WHERE users.id = 19

SELECT * FROM users ORDER BY id

UPDATE users
SET username = 'tungded', password = '12345'
WHERE id = 2100 
AND NOT EXISTS (
	SELECT username FROM users 
	WHERE id <> 21 AND username LIKE 'tungded'
	)

ALTER TABLE users ALTER COLUMN roleid SET NOT NULL

INSERT INTO users(username, password, roleid) VALUES
('tungc','123', 5)