INSERT INTO departments (name)
VALUES ('Sales'), ('IT'), ('Customer Service'), ('Retail');


INSERT INTO roles (title, salary, department_id)
VALUES 
('Manager', 50000, 1),
('Manager', 55000, 2),
('Manager', 52000, 3),
('Manager', 58000, 4),
('Salesman', 44000, 1),
('Cashier', 25000, 4),
('Front-End Developer', 60000, 2),
('Back-End Developer', 60000, 2),
('Representitive', 35000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Jim', 'Waddles', 1, NULL),
('Pam', 'Spray', 2, NULL),
('Oreo', 'Cookie', 3, NULL),
('Vanilla', 'Bean', 4, NULL),
('Timothy', 'Franklin', 5, 1),
('Timothy', 'Franklin Jr.', 5, 1),
('Harold', 'Smith', 6, 4),
('Pikachu', 'Jones', 7, 2),
('Arthur', 'Pickett', 8, 2),
('Caroline', 'Fletcher', 9, 3),
('Caroline', 'Fletcher IV', 9, 3);