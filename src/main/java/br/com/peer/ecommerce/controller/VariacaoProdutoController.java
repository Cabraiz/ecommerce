package br.com.peer.ecommerce.controller;

import br.com.peer.ecommerce.model.VariacaoProduto;
import br.com.peer.ecommerce.service.VariacaoProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Variações de Produto", description = "CRUD das variações de cor dos produtos")
@RestController
@RequestMapping("/variacoes")
public class VariacaoProdutoController {

    private final VariacaoProdutoService service;

    public VariacaoProdutoController(VariacaoProdutoService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todas as variações de produto")
    @GetMapping
    public List<VariacaoProduto> listar() {
        return service.listar();
    }

    @Operation(summary = "Cadastra uma nova variação de produto")
    @PostMapping
    public VariacaoProduto salvar(@RequestBody VariacaoProduto variacao) {
        return service.salvar(variacao);
    }

    @Operation(summary = "Remove uma variação de produto pelo ID")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
