// 페이지 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", function () {
  // 필요한 DOM 요소 가져오기
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");
  const dateFilter = document.getElementById("date-filter");
  const productsGrid = document.getElementById("products-grid");

  // 모든 상품 카드 요소 가져오기
  let productCards = Array.from(productsGrid.querySelectorAll(".product-card"));

  // 검색 및 필터링 함수
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const priceSort = priceFilter.value;
    const dateSort = dateFilter.value;

    // 원본 상품 배열 복사
    let filteredProducts = [...productCards];

    // 검색어로 필터링
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((card) => {
        const productName = card
          .querySelector(".product-name")
          .textContent.toLowerCase();
        const productDescription =
          card
            .querySelector(".product-description")
            ?.textContent.toLowerCase() || "";
        return (
          productName.includes(searchTerm) ||
          productDescription.includes(searchTerm)
        );
      });
    }

    // 카테고리로 필터링
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((card) => {
        const productCategory =
          card.querySelector(".product-category")?.textContent.toLowerCase() ||
          "";
        return productCategory.includes(category);
      });
    }

    // 가격으로 정렬
    if (priceSort !== "default") {
      filteredProducts.sort((a, b) => {
        const priceA = parseFloat(
          a
            .querySelector(".product-price")
            .textContent.replace(/[^0-9.-]+/g, "")
        );
        const priceB = parseFloat(
          b
            .querySelector(".product-price")
            .textContent.replace(/[^0-9.-]+/g, "")
        );

        if (priceSort === "low-to-high") {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
    }

    // 날짜로 정렬 (data-date 속성 사용)
    if (dateSort !== "newest") {
      filteredProducts.sort((a, b) => {
        const dateA = new Date(a.dataset.date || 0);
        const dateB = new Date(b.dataset.date || 0);

        if (dateSort === "oldest") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    }

    // 결과가 없을 경우 메시지 표시
    if (filteredProducts.length === 0) {
      productsGrid.innerHTML =
        '<p class="no-products">검색 결과가 없습니다.</p>';
      return;
    }

    // 필터링된 상품만 표시
    productsGrid.innerHTML = "";
    filteredProducts.forEach((card) => {
      productsGrid.appendChild(card);
    });
  }

  // 이벤트 리스너 등록
  searchInput.addEventListener("input", filterProducts);
  searchButton.addEventListener("click", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
  priceFilter.addEventListener("change", filterProducts);
  dateFilter.addEventListener("change", filterProducts);

  // 초기 로드 시 최신순 정렬
  dateFilter.value = "newest";
  filterProducts();
});
