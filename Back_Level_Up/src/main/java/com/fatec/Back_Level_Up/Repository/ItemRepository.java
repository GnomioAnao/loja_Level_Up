package com.fatec.Back_Level_Up.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.Back_Level_Up.Entity.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    
}
