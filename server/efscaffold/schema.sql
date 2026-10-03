drop schema if exists todosystem cascade ;
create schema if not exists todosystem;

create table todosystem.todo(
                                id text not null primary key,
                                title text not null,
                                description text not null,
                                priority numeric not null

);

select * from todosystem.todo;