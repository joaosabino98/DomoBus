CREATE TABLE person (
	person_id SERIAL NOT NULL,
	person_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (person_id)
);
CREATE TABLE home (
	home_id SERIAL NOT NULL, 
	home_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (home_id)
);
CREATE TABLE role (
	role_id SERIAL NOT NULL,
	role_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (role_id)
);
CREATE TABLE home_person_role (
	person_id INT NOT NULL,
	home_id INT NOT NULL,
	role_id INT NOT NULL,
	PRIMARY KEY (person_id, home_id, role_id),
	FOREIGN KEY (person_id) REFERENCES person (person_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (home_id) REFERENCES home (home_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE division (
	division_id SERIAL NOT NULL, 
	division_home_id INT NOT NULL,
	division_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (division_id),
	FOREIGN KEY (division_home_id) REFERENCES home (home_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE person_division_access (
	person_id INT NOT NULL,
	division_id INT NOT NULL,
	can_control BOOLEAN DEFAULT TRUE,
	PRIMARY KEY (person_id, division_id),
	FOREIGN KEY (person_id) REFERENCES person (person_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (division_id) REFERENCES division (division_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE type (
	type_id SERIAL NOT NULL, 
	type_name VARCHAR(80) NOT NULL,
	PRIMARY KEY (type_id)
);
CREATE TABLE property (
	property_id SERIAL NOT NULL,
	property_name VARCHAR(80) NOT NULL,
	property_default_value INT NOT NULL,
	PRIMARY KEY (property_id)
);
CREATE TABLE type_property (
	type_id INT NOT NULL,
	property_id INT NOT NULL,
	PRIMARY KEY (type_id, property_id),
	FOREIGN KEY (type_id) REFERENCES type (type_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (property_id) REFERENCES property (property_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE device (
	device_id SERIAL NOT NULL, 
	device_name VARCHAR(80) NOT NULL,
	device_type_id INT NOT NULL,
	device_division_id INT,
	device_home_id INT NOT NULL,
	PRIMARY KEY (device_id),
	FOREIGN KEY (device_type_id) REFERENCES type (type_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (device_division_id) REFERENCES division (division_id) ON UPDATE CASCADE,
	FOREIGN KEY (device_home_id) REFERENCES home (home_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE value (
	value_device_id INT NOT NULL,
	value_property_id INT NOT NULL,
	value_number INT DEFAULT 0,
	PRIMARY KEY (value_device_id, value_property_id),
	FOREIGN KEY (value_device_id) REFERENCES device (device_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (value_property_id) REFERENCES property (property_id) ON DELETE CASCADE ON UPDATE CASCADE
);
	
create role web_anon nologin;
grant web_anon to app_user;

grant usage on schema public to web_anon;
grant select on home to web_anon;

create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;


-- TODO:
-- Authentication
-- User Registering
-- Functions