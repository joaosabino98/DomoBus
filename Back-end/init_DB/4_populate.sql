-- CUSTOM HOMES AND DIVISIONS
INSERT INTO domobus.home VALUES (DEFAULT, 'Casa da Venezuela');
INSERT INTO domobus.home VALUES (DEFAULT, 'Casa de Lisboa');
INSERT INTO domobus.home VALUES (DEFAULT, 'Casa de Papel');
INSERT INTO domobus.division VALUES (DEFAULT, 1, 'Cozinha');
INSERT INTO domobus.division VALUES (DEFAULT, 1, 'Quarto');
INSERT INTO domobus.division VALUES (DEFAULT, 1, 'Sala');

-- STATIC ROLES
INSERT INTO domobus.role VALUES (DEFAULT, 'OWNER');
INSERT INTO domobus.role VALUES (DEFAULT, 'USER');

-- CUSTOM PERSONS AND RELATIONSHIPS
INSERT INTO domobus.person VALUES (DEFAULT, 'Alejandro Rachadell');
INSERT INTO domobus.person VALUES (DEFAULT, 'João Sabino');
INSERT INTO domobus.home_person_role VALUES (1, 1, 1); -- Alejandro é OWNER da Casa da Venezuela
INSERT INTO domobus.home_person_role VALUES (1, 2, 2); -- João é USER da Casa da Venezuela
INSERT INTO domobus.home_person_role VALUES (2, 1, 2); -- Alejandro é USER da Casa de Lisboa
INSERT INTO domobus.home_person_role VALUES (2, 2, 1); -- João é OWNER da Casa de Lisboa
INSERT INTO domobus.person_division_access VALUES (1, 1, DEFAULT); -- OWNER TEM ACESSO TOTAL A TODAS AS DIVISÕES
INSERT INTO domobus.person_division_access VALUES (1, 2, DEFAULT); -- TODO: Criar trigger para conceder acesso a todas as divisões por default
INSERT INTO domobus.person_division_access VALUES (1, 3, DEFAULT);
INSERT INTO domobus.person_division_access VALUES (2, 1, FALSE);
INSERT INTO domobus.person_division_access VALUES (2, 2, FALSE);
INSERT INTO domobus.person_division_access VALUES (2, 3, TRUE);

-- STATIC TYPES, PROPERTIES AND RELATIONSHIPS
INSERT INTO domobus.type VALUES (DEFAULT, 'Lâmpada');
INSERT INTO domobus.type VALUES (DEFAULT, 'Termostato');
INSERT INTO domobus.type VALUES (DEFAULT, 'Ar condicionado');
INSERT INTO domobus.type VALUES (DEFAULT, 'Porta/portão');
INSERT INTO domobus.type VALUES (DEFAULT, 'Estore');
INSERT INTO domobus.type VALUES (DEFAULT, 'Eletrodoméstico genérico');
INSERT INTO domobus.property VALUES (DEFAULT, 'Ligado', 0); -- 0/1
INSERT INTO domobus.property VALUES (DEFAULT, 'Temperatura', 250); -- 25.0ºC
INSERT INTO domobus.property VALUES (DEFAULT, 'Intensidade', 100); -- 0 - 100%
INSERT INTO domobus.property VALUES (DEFAULT, 'Aberto', 0); -- 0/1
INSERT INTO domobus.property VALUES (DEFAULT, 'Elevação', 0); -- 0 - 100%
INSERT INTO domobus.type_property VALUES (1, 1); -- Lâmpada tem estado ligado
INSERT INTO domobus.type_property VALUES (1, 3); -- Lâmpada tem intensidade
INSERT INTO domobus.type_property VALUES (2, 2); -- Termostato tem estado temperatura
INSERT INTO domobus.type_property VALUES (3, 1); -- Ar condicionado tem estado ligado
INSERT INTO domobus.type_property VALUES (3, 2); -- Ar condicionado tem temperatura
INSERT INTO domobus.type_property VALUES (3, 3); -- Ar condicionado tem intensidade
INSERT INTO domobus.type_property VALUES (4, 4); -- Porta tem estado aberto
INSERT INTO domobus.type_property VALUES (5, 5); -- Estore tem elevação
INSERT INTO domobus.type_property VALUES (6, 1); -- Eletrodoméstico genérico tem estado ligado


-- CUSTOM DEVICES
INSERT INTO domobus.device VALUES (DEFAULT, 'Candeeiro de pé', 1, 3, 1); -- Lãmpada, Sala, Casa da Venezuela
INSERT INTO domobus.device VALUES (DEFAULT, 'Portão da garagem', 4, NULL, 1); -- Porta, sem divisão, Casa da Venezuela
INSERT INTO domobus.device VALUES (DEFAULT, 'Estore da janela', 5, 3, 1); -- Estore, Sala, Casa da Venezuela