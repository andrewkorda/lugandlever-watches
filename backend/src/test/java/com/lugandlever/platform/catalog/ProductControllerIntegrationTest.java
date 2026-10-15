package com.lugandlever.platform.catalog;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /api/v1/catalog should return all seeded products with 200 OK")
    void shouldReturnAllProducts() throws Exception {
        mockMvc.perform(get("/api/v1/catalog")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(5))))
                .andExpect(jsonPath("$[0].currency").value("CAD"));
    }

    @Test
    @DisplayName("GET /api/v1/catalog?category=WATCH&subCategory=DIVER should filter correctly")
    void shouldFilterByCategoryAndSubcategory() throws Exception {
        mockMvc.perform(get("/api/v1/catalog")
                .param("category", "WATCH")
                .param("subCategory", "DIVER"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value(containsStringIgnoringCase("Diver")));
    }

    @Test
    @DisplayName("GET /api/v1/catalog?q=powermatic should perform full-text search across JSON/description")
    void shouldSearchByTextQuery() throws Exception {
        mockMvc.perform(get("/api/v1/catalog")
                .param("q", "powermatic"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].slug").value("khaki-expedition-field-38"));
    }
}