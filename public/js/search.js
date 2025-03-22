// 페이지 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", function () {
  // 필요한 DOM 요소 가져오기
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const productsGrid = document.getElementById("products-grid");

  // 모든 상품 카드 요소 가져오기
  let productCards = Array.from(productsGrid.querySelectorAll(".product-card"));

  // 검색 함수
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();

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
});
