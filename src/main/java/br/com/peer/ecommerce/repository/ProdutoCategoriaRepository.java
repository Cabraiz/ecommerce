package br.com.peer.ecommerce.repository;

import br.com.peer.ecommerce.model.ProdutoCategoria;
import br.com.peer.ecommerce.model.ProdutoCategoriaId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoCategoriaRepository extends JpaRepository<ProdutoCategoria, ProdutoCategoriaId> {
}