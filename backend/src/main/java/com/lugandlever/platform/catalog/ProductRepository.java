package com.lugandlever.platform.catalog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

  @Query(value = """
      SELECT * FROM products p
      WHERE (cast(:category as text) IS NULL OR p.category = cast(:category as text))
        AND (cast(:subCategory as text) IS NULL OR p.sub_category = cast(:subCategory as text))
        AND (
          cast(:collection as text) IS NULL 
          OR (cast(:collection as text) = 'FEATURED' AND p.is_featured = true)
          OR (cast(:collection as text) = 'BEST_SELLERS' AND p.is_best_seller = true)
          OR (cast(:collection as text) = 'COMMUNITY_VAULT' AND p.is_vault_item = true)
        )
        AND (
          cast(:query as text) IS NULL 
          OR p.search_vector @@ websearch_to_tsquery('english', cast(:query as text))
        )
      ORDER BY p.price_cents ASC
      """, nativeQuery = true)
  List<Product> searchCatalog(
      @Param("category") String category,
      @Param("subCategory") String subCategory,
      @Param("collection") String collection,
      @Param("query") String query
  );
}