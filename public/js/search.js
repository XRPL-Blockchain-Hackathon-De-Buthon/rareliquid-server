document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const productsGrid = document.getElementById("products-grid");

  if (searchInput && searchButton && productsGrid) {
    // 검색 기능 구현
    searchButton.addEventListener("click", function () {
      performSearch();
    });

    // 엔터 키로 검색 실행
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });

    // 실시간 검색 (선택적)
    searchInput.addEventListener("input", function () {
      if (searchInput.value.length > 2) {
        performSearch();
      }
    });

    function performSearch() {
      const query = searchInput.value.trim();

      // 모든 상품 카드 요소 가져오기
      const productCards = productsGrid.querySelectorAll(".product-card");

      if (query === "") {
        // 검색어가 비어있으면 모든 상품 표시
        productCards.forEach((card) => {
          card.style.display = "block";
        });
        return;
      }

      // 검색어를 소문자로 변환
      const lowerQuery = query.toLowerCase();

      // 각 상품 카드를 순회하며 검색어와 일치하는지 확인
      productCards.forEach((card) => {
        const productName = card
          .querySelector(".product-name")
          .textContent.toLowerCase();
        const productCategory = card
          .querySelector(".product-category")
          .textContent.toLowerCase();

        // 상품명이나 카테고리에 검색어가 포함되어 있으면 표시, 아니면 숨김
        if (
          productName.includes(lowerQuery) ||
          productCategory.includes(lowerQuery)
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      // 검색 결과가 없을 경우 메시지 표시
      const visibleProducts = productsGrid.querySelectorAll(
        '.product-card[style="display: block"]'
      );
      if (visibleProducts.length === 0) {
        // 이미 '검색 결과 없음' 메시지가 있는지 확인
        let noResultsMsg = productsGrid.querySelector(".no-results");

        if (!noResultsMsg) {
          noResultsMsg = document.createElement("p");
          noResultsMsg.className = "no-results";
          noResultsMsg.textContent = "검색 결과가 없습니다.";
          productsGrid.appendChild(noResultsMsg);
        }
      } else {
        // 검색 결과가 있으면 '검색 결과 없음' 메시지 제거
        const noResultsMsg = productsGrid.querySelector(".no-results");
        if (noResultsMsg) {
          noResultsMsg.remove();
        }
      }
    }
  }
});
