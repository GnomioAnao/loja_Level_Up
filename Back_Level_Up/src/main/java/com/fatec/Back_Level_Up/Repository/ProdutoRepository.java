package com.fatec.Back_Level_Up.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fatec.Back_Level_Up.Entity.Produto;

@Repository
public interface ProdutoRepository extends
JpaRepository<Produto, Integer> {

    @Query(value = "SELECT * FROM produto WHERE destaque > 0 ORDER BY destaque DESC", nativeQuery = true)
    List<Produto> listarVitrine();
    
    @Query(value = "SELECT * FROM produto WHERE keywords LIKE %?1%", nativeQuery = true)
    List<Produto> fazerBusca(String keywords);


}
