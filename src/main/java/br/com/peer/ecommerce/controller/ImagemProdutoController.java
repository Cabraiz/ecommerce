package br.com.peer.ecommerce.controller;

import br.com.peer.ecommerce.model.ImagemProduto;
import br.com.peer.ecommerce.service.ImagemProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Imagens de Produto", description = "CRUD de imagens vinculadas aos produtos")
@RestController
@RequestMapping("/imagens")
public class ImagemProdutoController {

    private final ImagemProdutoService service;

    public ImagemProdutoController(ImagemProdutoService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todas as imagens de produtos")
    @GetMapping
    public List<ImagemProduto> listar() {
        return service.listar();
    }

    @Operation(summary = "Cadastra uma nova imagem de produto")
    @PostMapping
    public ImagemProduto salvar(@RequestBody ImagemProduto imagem) {
        return service.salvar(imagem);
    }

    @Operation(summary = "Remove uma imagem de produto pelo ID")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
