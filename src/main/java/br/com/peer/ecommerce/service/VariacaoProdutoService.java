package br.com.peer.ecommerce.service;

import br.com.peer.ecommerce.model.VariacaoProduto;
import br.com.peer.ecommerce.repository.VariacaoProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VariacaoProdutoService {

    private final VariacaoProdutoRepository repository;

    public VariacaoProdutoService(VariacaoProdutoRepository repository) {
        this.repository = repository;
    }

    public List<VariacaoProduto> listar() {
        return repository.findAll();
    }

    public VariacaoProduto salvar(VariacaoProduto variacao) {
        return repository.save(variacao);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
