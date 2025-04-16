package br.com.peer.ecommerce.controller;

import br.com.peer.ecommerce.model.TamanhoVariacao;
import br.com.peer.ecommerce.service.TamanhoVariacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Tamanhos de Variação", description = "CRUD de tamanhos vinculados às variações de produto")
@RestController
@RequestMapping("/tamanhos")
public class TamanhoVariacaoController {

    private final TamanhoVariacaoService service;

    public TamanhoVariacaoController(TamanhoVariacaoService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os tamanhos de variações")
    @GetMapping
    public List<TamanhoVariacao> listar() {
        return service.listar();
    }

    @Operation(summary = "Cadastra um novo tamanho de variação")
    @PostMapping
    public TamanhoVariacao salvar(@RequestBody TamanhoVariacao tamanho) {
        return service.salvar(tamanho);
    }

    @Operation(summary = "Remove um tamanho de variação pelo ID")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
