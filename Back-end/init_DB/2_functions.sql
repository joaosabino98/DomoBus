CREATE FUNCTION domobus.check_admin_permission(arg_person_id INT, arg_home_id INT)
RETURNS BOOLEAN AS
$$
DECLARE
	role domobus.role%rowtype;
BEGIN
	SELECT * FROM domobus.home_person_role
	WHERE (person_id = arg_person_id) AND (home_id = arg_home_id)
	INTO role;
	RETURN (role.role_id = 1);
END;
$$
LANGUAGE plpgsql;

CREATE FUNCTION domobus.check_division_permission(arg_person_id INT, arg_division_id INT)
RETURNS BOOLEAN AS
$$
DECLARE
	access domobus.person_division_access%rowtype;
BEGIN
	IF arg_division_id IS NULL THEN
		RETURN TRUE;
	ELSE
		SELECT * FROM domobus.person_division_access
		WHERE (person_id = arg_person_id) AND (division_id = arg_division_id)
		INTO access;
		RETURN access.can_control;
	END IF;
END;
$$
LANGUAGE plpgsql;

CREATE FUNCTION domobus.change_value(arg_person_id INT, arg_device_id INT, arg_property_id INT, arg_value_number INT)
RETURNS INT AS
$$
DECLARE
	device domobus.device%rowtype;
	result INT;
BEGIN
	SELECT * FROM domobus.device
	WHERE (device_id = arg_device_id)
	INTO device;
	IF domobus.check_admin_permission(arg_person_id, device.device_home_id)
	OR domobus.check_division_permission(arg_person_id, device.device_division_id) THEN
		UPDATE domobus.value
		SET value_number = arg_value_number
		WHERE (value_device_id = arg_device_id) AND (value_property_id = arg_property_id)
		RETURNING value_number INTO result;
	ELSE 
		RAISE EXCEPTION 'User % does not have enough permissions', arg_person_id
      	USING HINT = 'Please check if you can control this division.';
	END IF;
	RETURN result;
END;
$$
LANGUAGE plpgsql;

CREATE FUNCTION domobus.add_values_for_new_device()
RETURNS TRIGGER AS
$$
BEGIN
	INSERT INTO domobus.value (value_device_id, value_property_id, value_number)
	SELECT NEW.device_id, property_id, property_default_value
	FROM domobus.type_property NATURAL JOIN domobus.property
	WHERE (type_id = NEW.device_type_id);
	RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER new_device
	AFTER INSERT
	ON domobus.device
	FOR EACH ROW
	EXECUTE PROCEDURE domobus.add_values_for_new_device();