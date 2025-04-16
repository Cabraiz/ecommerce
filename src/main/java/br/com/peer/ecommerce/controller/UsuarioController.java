package br.com.peer.ecommerce.controller;

import br.com.peer.ecommerce.model.Usuario;
import br.com.peer.ecommerce.service.UsuarioService;
import br.com.peer.ecommerce.dto.LoginDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Usuários", description = "CRUD dos usuários do sistema")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os usuários")
    @GetMapping
    public List<Usuario> listar() {
        return service.listar();
    }

    @Operation(summary = "Cadastra um novo usuário")
    @PostMapping
    public Usuario salvar(@RequestBody Usuario usuario) {
        return service.salvar(usuario);
    }

    @Operation(summary = "Remove um usuário pelo ID")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @Operation(summary = "Login do usuário (email + senha)")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO login) {
        boolean autenticado = service.autenticar(login.getEmail(), login.getSenha());
        if (autenticado) {
            return ResponseEntity.ok("Login bem-sucedido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");
        }
    }
}
