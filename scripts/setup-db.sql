-- environment: development
-- create the user
create user root with password 'password';
-- create the databases
create database node_rest_api;
create database node_rest_api_test;
-- grant acess to the user
grant all privileges on database node_rest_api to root;
grant all privileges on database node_rest_api_test to root;