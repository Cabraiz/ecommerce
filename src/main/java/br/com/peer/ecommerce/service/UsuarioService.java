package br.com.peer.ecommerce.service;

import br.com.peer.ecommerce.model.Usuario;
import br.com.peer.ecommerce.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario salvar(Usuario usuario) {
        // Criptografa a senha antes de salvar
        usuario.setSenhaHash(encoder.encode(usuario.getSenhaHash()));
        return repository.save(usuario);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    // Novo método de autenticação simples (sem JWT)
    public boolean autenticar(String email, String senha) {
        Optional<Usuario> opt = repository.findByEmail(email);
        return opt.isPresent() && encoder.matches(senha, opt.get().getSenhaHash());
    }
}
