// public/js/wallet.js

// 지갑 연결 상태 확인
async function checkWalletConnection() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts && accounts.length > 0) {
        const account = accounts[0];
        updateUIWithWalletAddress(account);
        return account;
      }
      return null;
    } catch (err) {
      console.error("지갑 연결 상태 확인 중 오류 발생:", err);
      return null;
    }
  }
  return null;
}

// UI 업데이트 함수
function updateUIWithWalletAddress(account) {
  if (!account) return;

  // 쿠키에 지갑 주소 저장
  document.cookie = `myAccount=${account}; path=/`;

  // 지갑 주소 표시
  const walletAddressElement = document.getElementById("wallet-address");
  if (walletAddressElement) {
    walletAddressElement.textContent = `${account.substring(
      0,
      6
    )}...${account.substring(account.length - 4)}`;
  }

  // 지갑 연결 버튼 숨기기
  const connectWalletBtn = document.getElementById("connect-wallet-btn");
  if (connectWalletBtn) {
    connectWalletBtn.style.display = "none";
  }

  // 상품 업로드 페이지에서 지갑 주소 필드 자동 입력
  const addressInput = document.getElementById("address");
  if (addressInput) {
    addressInput.value = account;
    addressInput.readOnly = true;
    addressInput.style.backgroundColor = "#f0f0f0";
    addressInput.style.cursor = "not-allowed";
  }
}

// 지갑 연결 함수
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      updateUIWithWalletAddress(account);
      console.log(`지갑 연결 성공: ${account}`);

      return account;
    } catch (err) {
      if (err.code === 4001) {
        console.log("지갑 연결이 거부되었습니다.");
      } else {
        console.error("지갑 연결 중 오류 발생:", err);
      }
      return null;
    }
  } else {
    console.log("MetaMask가 설치되어 있지 않습니다.");
    alert("MetaMask를 설치해주세요!");
    return null;
  }
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", async function () {
  // 지갑 연결 상태 확인
  const connectedAccount = await checkWalletConnection();

  // 지갑 연결 버튼 이벤트 리스너 추가
  const connectWalletBtn = document.getElementById("connect-wallet-btn");
  if (connectWalletBtn) {
    // 이미 연결되어 있으면 버튼 숨기기
    if (connectedAccount) {
      connectWalletBtn.style.display = "none";
    } else {
      connectWalletBtn.addEventListener("click", connectWallet);
    }
  }

  // 계정 변경 이벤트 리스너
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      if (accounts.length === 0) {
        // 연결 해제됨
        location.reload();
      } else {
        // 계정 변경됨
        updateUIWithWalletAddress(accounts[0]);
      }
    });
  }
});
