package com.fatec.Back_Level_Up.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fatec.Back_Level_Up.Entity.Produto;

@Repository
public interface ProdutoRepository extends
JpaRepository<Produto, Integer> {

    @Query(value = "select * from produto where destaque > 0", nativeQuery = true)
    List<Produto> listarVitrine();
    
    @Query(value = "select * from produto where nome=?1 and keywords=?2 ", nativeQuery = true)
    List<Produto> fazerBusca(); 
}