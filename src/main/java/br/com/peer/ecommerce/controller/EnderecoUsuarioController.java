package br.com.peer.ecommerce.controller;

import br.com.peer.ecommerce.model.EnderecoUsuario;
import br.com.peer.ecommerce.service.EnderecoUsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Endereços de Usuário", description = "CRUD de endereços vinculados a usuários")
@RestController
@RequestMapping("/enderecos")
public class EnderecoUsuarioController {

    private final EnderecoUsuarioService service;

    public EnderecoUsuarioController(EnderecoUsuarioService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os endereços")
    @GetMapping
    public List<EnderecoUsuario> listar() {
        return service.listar();
    }

    @Operation(summary = "Cadastra um novo endereço")
    @PostMapping
    public EnderecoUsuario salvar(@RequestBody EnderecoUsuario endereco) {
        return service.salvar(endereco);
    }

    @Operation(summary = "Remove um endereço pelo ID")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
