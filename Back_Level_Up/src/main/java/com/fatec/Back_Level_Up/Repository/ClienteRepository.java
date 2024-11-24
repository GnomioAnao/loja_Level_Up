package com.fatec.Back_Level_Up.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fatec.Back_Level_Up.Entity.Cliente;

@Repository
public interface ClienteRepository extends
JpaRepository<Cliente,Integer> {

    @Query(value = "select * from cliente where email=?1 and senha=?2", nativeQuery = true)
    Optional<Cliente> login(String email, String senha);

    @Query(value = "select * from cliente where email=?1", nativeQuery = true)
    Optional<Cliente> recuperaSenha(String email);      

}