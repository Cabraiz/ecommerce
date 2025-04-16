package br.com.peer.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoCategoriaId implements Serializable {

    @Column(name = "produto_id")
    private Long produtoId;

    @Column(name = "categoria_id")
    private Long categoriaId;
}
