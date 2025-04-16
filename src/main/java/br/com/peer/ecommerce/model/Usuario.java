package br.com.peer.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    @Column(name = "senha_hash")
    private String senhaHash;

    private String cpf;

    private String telefone;

    private String papel;

    private Boolean ativo;

    @Column(name = "data_cadastro", updatable = false, insertable = false)
    private Timestamp dataCadastro;
}
