package com.fatec.Back_Level_Up.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fatec.Back_Level_Up.Entity.Cesta;

@Repository
public interface CestaRepository extends JpaRepository<Cesta, Integer> {
    @Query("SELECT COALESCE(MAX(c.codigo), 0) FROM Cesta c")
    int codMaximo();
}