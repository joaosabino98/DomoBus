create role web_anon nologin;
grant web_anon to app_user;

grant usage on schema domobus to web_anon;
grant select on domobus.person to web_anon;
grant select on domobus.home to web_anon;
grant select on domobus.type to web_anon;
grant select on domobus.division to web_anon;
grant select on domobus.property to web_anon;
grant select, update on domobus.device to web_anon;
grant select, update on domobus.value to web_anon;
grant select on domobus.home_person_role to web_anon;
grant select on domobus.person_division_access to web_anon;
grant execute on function domobus.check_division_permission(arg_person_id INT, arg_division_id INT) to web_anon;
grant execute on function domobus.change_name(arg_person_id INT, arg_device_id INT, arg_device_name VARCHAR(80)) to web_anon;
grant execute on function domobus.change_value(arg_person_id INT, arg_device_id INT, arg_property_id INT, arg_value_number INT) to web_anon;


create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;