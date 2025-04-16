package br.com.peer.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "variacoes_produto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VariacaoProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cor;

    @Column(name = "produto_id")
    private Long produtoId;
}
