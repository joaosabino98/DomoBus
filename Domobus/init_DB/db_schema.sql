
CREATE SCHEMA domobus
	CREATE TABLE property (
		property_id SERIAL NOT NULL, 
		property_name VARCHAR(80) NOT NULL,
		PRIMARY KEY (property_id)
	);
	CREATE TABLE type (
		type_id SERIAL NOT NULL, 
		type_name VARCHAR(80) NOT NULL,
		type_value VARCHAR(80) NOT NULL,
		PRIMARY KEY (type_id)
	);
	CREATE TABLE device (
		device_id SERIAL NOT NULL, 
		device_type INT NOT NULL,
		PRIMARY KEY (device_id),
		FOREIGN KEY (device_type) REFERENCES type (type_id) ON DELETE CASCADE ON UPDATE CASCADE
	);
	CREATE TABLE attribute (
		attribute_id SERIAL NOT NULL,
		attribute_name VARCHAR(80) NOT NULL,
		PRIMARY KEY (attribute_id)
	);
	CREATE TABLE value (
		device_id INT NOT NULL,
		attribute_id INT NOT NULL,
		value INT,
		PRIMARY KEY (device_id, attribute_id),
		FOREIGN KEY (device_id) REFERENCES device (device_id) ON DELETE CASCADE ON UPDATE CASCADE,
		FOREIGN KEY (attribute_id) REFERENCES attribute (attribute_id) ON DELETE CASCADE ON UPDATE CASCADE
	);
	
create role web_anon nologin;
grant web_anon to app_user;

grant usage on schema domobus to web_anon;
grant select on domobus.property to web_anon;

create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;
