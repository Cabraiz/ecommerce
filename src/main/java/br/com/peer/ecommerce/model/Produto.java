package br.com.peer.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "produtos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(columnDefinition = "TEXT") // opcional, se sua coluna for tipo clob ou text
    private String descricao;

    private Double preco;

    private Boolean ativo;

    @Column(name = "data_cadastro", updatable = false, insertable = false)
    private java.sql.Timestamp dataCadastro; // se quiser mapear o campo timestamp também
}
