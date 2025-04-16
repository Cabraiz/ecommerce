package br.com.peer.ecommerce.controller;

import br.com.peer.ecommerce.model.Categoria;
import br.com.peer.ecommerce.service.CategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Categorias", description = "CRUD de categorias de produtos")
@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todas as categorias")
    @GetMapping
    public List<Categoria> listar() {
        return service.listar();
    }

    @Operation(summary = "Cadastra uma nova categoria")
    @PostMapping
    public Categoria salvar(@RequestBody Categoria categoria) {
        return service.salvar(categoria);
    }

    @Operation(summary = "Deleta uma categoria pelo ID")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
