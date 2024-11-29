package com.fatec.Back_Level_Up.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Produto {
    @Id
    private int codigo;
    private String nome;
    private String descritivo;
    private double valor;
    private String quantidade;
    private String keywords;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String descritivoCompleto;
    private int destaque = 0;


    public int getCodigo() {
        return codigo;
    }
    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getDescritivo() {
        return descritivo;
    }
    public void setDescritivo(String descritivo) {
        this.descritivo = descritivo;
    }
    public double getValor() {
        return valor;
    }
    public void setValor(double valor) {
        this.valor = valor;
    }
    public String getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(String quantidade) {
        this.quantidade = quantidade;
    }
    public String getKeywords() {
        return keywords;
    }
    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }
    public String getDescritivoCompleto() {
        return descritivoCompleto;
    }
    public void setDescritivoCompleto(String descritivoCompleto) {
        this.descritivoCompleto = descritivoCompleto;
    }
    public int getDestaque() {
        return destaque;
    }
    public void setDestaque(int destaque) {
        this.destaque = destaque;
    }
}