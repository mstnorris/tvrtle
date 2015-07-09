<?php namespace Tvrtle\Repositories;

interface UserRepository
{
    public function getAll();

    public function show($id);
}