package br.com.peer.ecommerce.repository;

import br.com.peer.ecommerce.model.ImagemProduto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagemProdutoRepository extends JpaRepository<ImagemProduto, Long> {
}