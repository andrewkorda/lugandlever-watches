package com.lugandlever.platform.catalog;

import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(name = "sub_category")
    private String subCategory;

    @Column(name = "price_cents", nullable = false)
    private Integer priceCents;

    @Column(nullable = false)
    private String currency;

    private String badge;

    @Column(name = "short_description", nullable = false)
    private String shortDescription;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "in_stock", nullable = false)
    private Boolean inStock;

    @Type(JsonBinaryType.class)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> specs;

    @Column(name = "is_featured", nullable = false)
    private Boolean isFeatured = false;

    @Column(name = "is_best_seller", nullable = false)
    private Boolean isBestSeller = false;

    @Column(name = "is_vault_item", nullable = false)
    private Boolean isVaultItem = false;

    // Getters and helper for frontend dollar display
    public UUID getId() { return id; }
    public String getSlug() { return slug; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getSubCategory() { return subCategory; }
    public BigDecimal getPrice() { return BigDecimal.valueOf(priceCents, 2); }
    public String getCurrency() { return currency; }
    public String getBadge() { return badge; }
    public String getShortDescription() { return shortDescription; }
    public String getImageUrl() { return imageUrl; }
    public Boolean getInStock() { return inStock; }
    public Map<String, Object> getSpecs() { return specs; }
    public Boolean getIsFeatured() { return isFeatured; }
    public Boolean getIsBestSeller() { return isBestSeller; }
    public Boolean getIsVaultItem() { return isVaultItem; }
}