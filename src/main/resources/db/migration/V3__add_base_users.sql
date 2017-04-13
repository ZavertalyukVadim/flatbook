insert into users (first_name, last_name, pass) values ('Andrey', 'backend', '$2a$10$OBMisadBt/txTOni1p7UXunor.PIVS.K8umzsuAgBhlzbhPDnf8XW');

insert into emails (content, is_primary, user_id) values ('hello@gmail.com', true, 2);
insert into emails (content, is_primary, user_id) values ('asdfg@gmail.com', false, 2);


insert into users (first_name, last_name, pass) values ('Vlad', 'frontend', '$2a$10$QA7.Vw.kRc.QZ86QU5ycP..ZkwildNcXfCvuBudh..Z13Fg.T3bUq');
--
-- insert into emails (content, is_primary, user_id) values ('simple@gmail.com', true, 2);
-- insert into emails (content, is_primary, user_id) values ('simple@mail.ru', false, 2);
--
-- insert into phones (content, is_primary, user_id) values ('+380951112233', true, 1);
-- insert into phones (content, is_primary, user_id) values ('+380951112211', false, 1);
