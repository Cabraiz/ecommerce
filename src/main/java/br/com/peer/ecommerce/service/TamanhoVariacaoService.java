package br.com.peer.ecommerce.service;

import br.com.peer.ecommerce.model.TamanhoVariacao;
import br.com.peer.ecommerce.repository.TamanhoVariacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TamanhoVariacaoService {

    private final TamanhoVariacaoRepository repository;

    public TamanhoVariacaoService(TamanhoVariacaoRepository repository) {
        this.repository = repository;
    }

    public List<TamanhoVariacao> listar() {
        return repository.findAll();
    }

    public TamanhoVariacao salvar(TamanhoVariacao tamanho) {
        return repository.save(tamanho);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
