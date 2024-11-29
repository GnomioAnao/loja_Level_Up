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

    @Query(value = "SELECT * FROM cliente WHERE email = ?1 OR documento = ?2 ", nativeQuery = true)
    Optional<Cliente> findByEmailDocumento(String email, String documento);

    @Query(value = "SELECT * FROM cliente WHERE codigo = ?1 OR cpf = ?1 OR rg = ?1 OR email = ?1", nativeQuery = true)
    Optional<Cliente> findByCodigoDocumentoEmail(String valor);


}
