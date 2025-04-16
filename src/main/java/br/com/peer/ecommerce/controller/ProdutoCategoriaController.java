package br.com.peer.ecommerce.controller;

import br.com.peer.ecommerce.model.ProdutoCategoria;
import br.com.peer.ecommerce.model.ProdutoCategoriaId;
import br.com.peer.ecommerce.service.ProdutoCategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Produto-Categoria", description = "Relacionamento entre produtos e categorias")
@RestController
@RequestMapping("/produto-categoria")
public class ProdutoCategoriaController {

    private final ProdutoCategoriaService service;

    public ProdutoCategoriaController(ProdutoCategoriaService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os vínculos entre produtos e categorias")
    @GetMapping
    public List<ProdutoCategoria> listar() {
        return service.listar();
    }

    @Operation(summary = "Cria um vínculo entre um produto e uma categoria")
    @PostMapping
    public ProdutoCategoria salvar(@RequestBody ProdutoCategoria produtoCategoria) {
        return service.salvar(produtoCategoria);
    }

    @Operation(summary = "Remove o vínculo entre um produto e uma categoria")
    @DeleteMapping
    public void deletar(@RequestBody ProdutoCategoriaId id) {
        service.deletar(id);
    }
}
