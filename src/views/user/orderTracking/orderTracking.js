let $noOrderProduct, $orderTable;
let userId;
let saveData; // 반환된 orderData들을 저장하는 변수. 이 변수로 기간이나 배송상태 선택해서 filter
// 오늘 날짜 - 주문 날짜와 차이 계산하기 위해
let today = new Date;
today = today.toISOString().substring(0,10); // 0000-00-00 형태

getOrderData(); // 데이터 불러오기
  async function getOrderData() {
    const currentUrl = window.location.href;
    userId = currentUrl.split('/')[5];
  await fetch(`/api/users/mypage/order-tracking?userId=${userId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((orderData) => {
        if (orderData.length < 1) { // 주문 내역 없을 때
          tableDisplay("none", "display");
        } else {
          tableDisplay("display", "none");
          saveData = orderData;
          orderData.forEach(data => {
            let { deliveryStatus, orderProducts, totalPrice, orderDate: date } = data;
            const orderId = data["_id"];
            date = date.toString().substring(0,10);
            addProduct(orderId, date, orderProducts, deliveryStatus, totalPrice);
          });
        }
    })
    .catch((err) => console.log(err));
}

// 상품 삽입
function addProduct(orderId, orderDate, orderProducts, deliveryStatus, totalPrice) {
  let cnt = 0;
  for (let product of orderProducts) {
    cnt += product.count;
  }
  const product = orderProducts[0].products;
  const size = orderProducts[0].size;
  const productImg = product.description;
  const productName =
    orderProducts.length === 1
      ? String(product.productName).toUpperCase()
      : `${String(product.productName).toUpperCase()} - ${size}외 ${
          orderProducts.length - 1
        }`;
        
  let content = 
    `<tr class='order-${orderId}'>
      <td class="order-id">
        <p>${orderDate}</p>
        <p>${orderId}</p>
      </td>
      <td class="product-img"><img src=${productImg}></td>
      <td class="product-name">${productName}</td>
      <td class="price">${String(totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td class="count">${cnt}</td>
      <td>
      <button class='cancel-btn'>취소신청</button>
      </td>
      <td class="delivery-status">${deliveryStatus}</td>
    </tr>`;

    $orderTable.insertAdjacentHTML('beforeend', content);
}

function tableDisplay(trDisplay, noOrderDivDisplay) {
  $orderTable = document.querySelector('.order-tracking-table');
  $noOrderProduct = document.querySelector('.no-order-product');

  const $tr = $orderTable.querySelectorAll("tr:not([class='order-title'])");
  $tr.forEach(el => el.style.display = trDisplay);
  $noOrderProduct.style.display = noOrderDivDisplay;

}

let $select = document.getElementById('order-status-select');
let orderStatus;
$select.addEventListener('change', function() {
  orderStatus = $select.options[$select.selectedIndex].label;
  if (orderStatus === "전체 주문처리상태") 
    window.location.href = `/user/orderTracking/${userId}`;

  getOrderDataSelectStatus(orderStatus);
});
  
// 주문 처리상태로 검색 - 배송완료, 주문 완료, 배송중 ..
function getOrderDataSelectStatus(orderStatus) {
  // 주문 내역이 없으면 아래 함수들 실행 안되게
  //if ($orderTable.querySelectorAll('tbody').length === 1) return;

  $orderTable = document.querySelector('.order-tracking-table');
  $noOrderProduct = document.querySelector('.no-order-product');
  const $tableItems = $orderTable.querySelectorAll("tr:not([class='order-title'])");
  $tableItems.forEach((el) => el.parentElement.remove());

  saveData.forEach(data => {
    let { deliveryStatus, orderProducts, totalPrice, orderDate: date } = data;
    const orderId = data["_id"];
    date = date.toString().substring(0,10);

    if (deliveryStatus === orderStatus)
      addProduct(orderId, date, orderProducts, deliveryStatus, totalPrice);
  });

  // 주문 내역이 있을 때 없을 때
  if ($orderTable.querySelectorAll('tbody').length === 1) {
    $noOrderProduct.style.display = "block";
  } else {
    $noOrderProduct.style.display = "none";
  }
}

document.querySelector('.today').addEventListener('click', (e) => getOrderDataPeriod(0));
document.querySelector('.months').addEventListener('click', () => getOrderDataPeriod(1));
document.querySelector('.three-months').addEventListener('click', () => getOrderDataPeriod(3));
document.querySelector('.six-months').addEventListener('click', () => getOrderDataPeriod(6));

// 기간으로 검색 - 오늘, 1개월, 3개월
function getOrderDataPeriod(period) {
  // 주문 내역이 없으면 아래 함수들 실행 안되게
  if ($orderTable.querySelectorAll('tbody').length === 1) return;

  $orderTable = document.querySelector('.order-tracking-table');
  $noOrderProduct = document.querySelector('.no-order-product');

  const $tr = $orderTable.querySelectorAll("tr:not([class='order-title'])");
  $tr.forEach(el => el.style.display = "block");
  const $tableItems = $orderTable.querySelectorAll("tr:not([class='order-title'])");
  $tableItems.forEach((el) => el.parentElement.remove());

  todayDate = new Date(today);

  saveData.forEach(data => {
    let { deliveryStatus, orderProducts, totalPrice, orderDate: date } = data;
    const orderId = data["_id"];
    date = date.toString().substring(0,10);

    let orderDate = new Date(date);

    // 오늘날짜와 주문날짜 비교해서 개월 차이 반환
    let diff = Math.abs((todayDate.getFullYear() - orderDate.getFullYear())*12 + (todayDate.getMonth() - orderDate.getMonth()));
    
    if (todayDate === date)
      addProduct(orderId, date, orderProducts, deliveryStatus, totalPrice);

    if (diff < period || diff === period)
      addProduct(orderId, date, orderProducts, deliveryStatus, totalPrice);
  });

  // 주문 내역이 있을 때 없을 때
  if ($orderTable.querySelectorAll('tbody').length === 1) {
    $noOrderProduct.style.display = "block";
  } else {
    $noOrderProduct.style.display = "none";
  }
}
document.querySelector('.order-tracking-table').addEventListener('click', (e) => {
  if (e.target.className === "cancel-btn") {
    cancelOrder(e.target);
  }
});

async function cancelOrder(button) {
  const removeTarget = button.parentElement.closest('tr');
  const orderId = removeTarget.className.split('-')[1];

  const url = `/api/users/mypage/order-tracking?orderId=${orderId}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // JSON 데이터 전송을 위한 헤더
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        if (confirm("취소하시겠습니까?")){
            removeTarget.parentElement.remove();
            window.location.href = `/user/orderTracking/${userId}`;
        }
      } else {
        alert(data.errMsg);
      }
    })
    .catch((err) => alert(err));
}

