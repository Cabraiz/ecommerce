package br.com.peer.ecommerce.service;

import br.com.peer.ecommerce.model.ProdutoCategoria;
import br.com.peer.ecommerce.model.ProdutoCategoriaId;
import br.com.peer.ecommerce.repository.ProdutoCategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoCategoriaService {

    private final ProdutoCategoriaRepository repository;

    public ProdutoCategoriaService(ProdutoCategoriaRepository repository) {
        this.repository = repository;
    }

    public List<ProdutoCategoria> listar() {
        return repository.findAll();
    }

    public ProdutoCategoria salvar(ProdutoCategoria produtoCategoria) {
        return repository.save(produtoCategoria);
    }

    public void deletar(ProdutoCategoriaId id) {
        repository.deleteById(id);
    }
}
