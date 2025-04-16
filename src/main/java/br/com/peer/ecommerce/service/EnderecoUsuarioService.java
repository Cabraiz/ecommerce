package br.com.peer.ecommerce.service;

import br.com.peer.ecommerce.model.EnderecoUsuario;
import br.com.peer.ecommerce.repository.EnderecoUsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnderecoUsuarioService {

    private final EnderecoUsuarioRepository repository;

    public EnderecoUsuarioService(EnderecoUsuarioRepository repository) {
        this.repository = repository;
    }

    public List<EnderecoUsuario> listar() {
        return repository.findAll();
    }

    public EnderecoUsuario salvar(EnderecoUsuario endereco) {
        return repository.save(endereco);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
