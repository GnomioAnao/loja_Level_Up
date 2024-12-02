package com.fatec.Back_Level_Up.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.Back_Level_Up.Entity.Item;
import com.fatec.Back_Level_Up.Entity.Produto;
import com.fatec.Back_Level_Up.Repository.ItemRepository;
import com.fatec.Back_Level_Up.Repository.ProdutoRepository;

@RestController
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    ItemRepository bd;
    @Autowired
    ProdutoRepository produto;

    @PostMapping("/api/item")
    public void gravar(@RequestBody Item obj) {
        if (obj.getProduto() != null && obj.getProduto().getCodigo() != 0) {
            obj.setCodigoProduto(obj.getProduto().getCodigo());
        }
        bd.save(obj);
    }

    @PostMapping("/api/itensCesta")
    public void gravarLista(@RequestBody List<Item> obj) {
        for (Item item : obj) {
            if (item.getProduto() != null && item.getProduto().getCodigo() != 0) {
                item.setCodigoProduto(item.getProduto().getCodigo());
            }
        }
        bd.saveAll(obj);
    }

    @PutMapping("/api/item")
    public void alterar(@RequestBody Item obj) {
        bd.save(obj);
    }

    @GetMapping("/api/item/{codigo}")
    public Item carregar(@PathVariable int codigo) {
        Optional<Item> obj = bd.findById(codigo);
        if (obj.isPresent()) {
            Item item = obj.get();

            Optional<Produto> produtoOpt = produto.findById(item.getCodigoProduto());
            produtoOpt.ifPresent(item::setProduto);

            return item;
        } else {
            return null;
        }
    }

    @DeleteMapping("/api/item/{codigo}")
    public void remover(@PathVariable int codigo) {
        bd.deleteById(codigo);
    }

    @GetMapping("/api/itens")
    public List<Item> listar() {
        List<Item> itens = bd.findAll();
        for (Item item : itens) {
            Optional<Produto> produtoOpt = produto.findById(item.getCodigoProduto());
            produtoOpt.ifPresent(item::setProduto);
        }
        return itens;
    }
}