package br.com.peer.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "enderecos_usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String apelido;

    private String logradouro;

    private String cidade;

    private String uf;

    private String cep;

    private Boolean principal;

    @Column(name = "usuario_id")
    private Long usuarioId;
}
