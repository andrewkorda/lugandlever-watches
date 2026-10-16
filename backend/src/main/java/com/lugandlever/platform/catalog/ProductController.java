package com.lugandlever.platform.catalog;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "subCategory", required = false) String subCategory,
            @RequestParam(name = "collection", required = false) String collection,
            @RequestParam(name = "q", required = false) String q) {

        String cleanCategory = (category != null && !category.isBlank() && !category.equalsIgnoreCase("ALL")) ? category.toUpperCase() : null;
        String cleanSubCategory = (subCategory != null && !subCategory.isBlank() && !subCategory.equalsIgnoreCase("ALL")) ? subCategory.toUpperCase() : null;
        String cleanCollection = (collection != null && !collection.isBlank() && !collection.equalsIgnoreCase("ALL")) ? collection.trim().replace(" ", "_").toUpperCase() : null;
        String cleanQuery = (q != null && !q.isBlank()) ? q.trim() : null;

        return ResponseEntity.ok(productRepository.searchCatalog(cleanCategory, cleanSubCategory, cleanCollection, cleanQuery));
    }
}