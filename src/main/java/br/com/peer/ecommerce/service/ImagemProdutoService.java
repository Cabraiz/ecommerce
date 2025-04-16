package br.com.peer.ecommerce.service;

import br.com.peer.ecommerce.model.ImagemProduto;
import br.com.peer.ecommerce.repository.ImagemProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagemProdutoService {

    private final ImagemProdutoRepository repository;

    public ImagemProdutoService(ImagemProdutoRepository repository) {
        this.repository = repository;
    }

    public List<ImagemProduto> listar() {
        return repository.findAll();
    }

    public ImagemProduto salvar(ImagemProduto imagem) {
        return repository.save(imagem);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
