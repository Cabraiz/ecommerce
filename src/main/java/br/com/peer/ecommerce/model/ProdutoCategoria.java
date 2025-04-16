package br.com.peer.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "produto_categoria")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoCategoria {

    @EmbeddedId
    private ProdutoCategoriaId id;
}
