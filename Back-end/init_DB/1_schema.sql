CREATE SCHEMA domobus;
CREATE TABLE domobus.person (
	person_id SERIAL NOT NULL,
	person_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (person_id)
);
CREATE TABLE domobus.home (
	home_id SERIAL NOT NULL, 
	home_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (home_id)
);
CREATE TABLE domobus.role (
	role_id SERIAL NOT NULL,
	role_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (role_id)
);
CREATE TABLE domobus.home_person_role (
	home_id INT NOT NULL,
	person_id INT NOT NULL,
	role_id INT NOT NULL,
	PRIMARY KEY (home_id, person_id, role_id),
	FOREIGN KEY (home_id) REFERENCES domobus.home (home_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (person_id) REFERENCES domobus.person (person_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (role_id) REFERENCES domobus.role (role_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE domobus.division (
	division_id SERIAL NOT NULL, 
	division_home_id INT NOT NULL,
	division_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (division_id),
	FOREIGN KEY (division_home_id) REFERENCES domobus.home (home_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE domobus.person_division_access (
	person_id INT NOT NULL,
	division_id INT NOT NULL,
	can_control BOOLEAN DEFAULT TRUE,
	PRIMARY KEY (person_id, division_id),
	FOREIGN KEY (person_id) REFERENCES domobus.person (person_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (division_id) REFERENCES domobus.division (division_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE domobus.type (
	type_id SERIAL NOT NULL, 
	type_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (type_id)
);
CREATE TABLE domobus.property (
	property_id SERIAL NOT NULL,
	property_name VARCHAR(80) NOT NULL,
	property_default_value INT NOT NULL,
	PRIMARY KEY (property_id)
);
CREATE TABLE domobus.type_property (
	type_id INT NOT NULL,
	property_id INT NOT NULL,
	PRIMARY KEY (type_id, property_id),
	FOREIGN KEY (type_id) REFERENCES domobus.type (type_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (property_id) REFERENCES domobus.property (property_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE domobus.device (
	device_id SERIAL NOT NULL, 
	device_name VARCHAR(80) NOT NULL,
	device_type_id INT NOT NULL,
	device_division_id INT,
	device_home_id INT NOT NULL,
	PRIMARY KEY (device_id),
	FOREIGN KEY (device_type_id) REFERENCES domobus.type (type_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (device_division_id) REFERENCES domobus.division (division_id) ON UPDATE CASCADE,
	FOREIGN KEY (device_home_id) REFERENCES domobus.home (home_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE domobus.value (
	value_device_id INT NOT NULL,
	value_property_id INT NOT NULL,
	value_number INT DEFAULT 0,
	PRIMARY KEY (value_device_id, value_property_id),
	FOREIGN KEY (value_device_id) REFERENCES domobus.device (device_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (value_property_id) REFERENCES domobus.property (property_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- -- Fixed repetition times (e.g: Daily, Weekly)
-- CREATE TABLE domobus.repetition (
-- 	repetition_id INT NOT NULL,
-- 	repetition_name VARCHAR(20) NOT NULL,
-- 	repetition_time INTERVAL NOT NULL,
-- 	PRIMARY KEY (repetition_id)
-- );
-- CREATE TABLE domobus.schedule (
-- 	schedule_device_id INT NOT NULL,
-- 	schedule_property_id INT NOT NULL,
-- 	schedule_number INT NOT NULL,
-- 	schedule_time TIMESTAMP(0) NOT NULL,
-- 	schedule_repetition_id INT,
-- 	PRIMARY KEY (schedule_device_id, schedule_property_id),
-- 	FOREIGN KEY (schedule_device_id) REFERENCES domobus.device (device_id) ON DELETE CASCADE ON UPDATE CASCADE,
-- 	FOREIGN KEY (schedule_property_id) REFERENCES domobus.property (property_id) ON DELETE CASCADE ON UPDATE CASCADE,
-- 	FOREIGN KEY (schedule_repetition_id) REFERENCES domobus.repetition (repetition_id) ON DELETE CASCADE ON UPDATE CASCADE
-- );
