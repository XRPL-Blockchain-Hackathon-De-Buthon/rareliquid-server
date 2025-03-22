// 공통 JavaScript 코드
document.addEventListener("DOMContentLoaded", function () {
  console.log("RARELIQUID 사이트가 로드되었습니다.");

  // 모바일 메뉴 토글 기능 (필요시 구현)
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      document.querySelector(".main-nav").classList.toggle("active");
    });
  }
});
