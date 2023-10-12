let $noOrderProduct, $orderTable;
let id = location.href.split('/');
id = id[id.length - 1];

let totalPage, currentPage = 1;
let pageCount = 3;
let lastNumber, firstNumber, next, prev, pageGroup = 1;
getOrderData(); // 데이터 불러오기
async function getOrderData() {

  await fetch(`/api/users/mypage/order-tracking?userId=${id}&page=${currentPage}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 400) {
        tableDisplay("none", "display");
      } 
      return res.json();
    })
    .then((res) => {
        const orderData = res.data;
        totalPage = res.totalPage;

        if (orderData.length < 1) { // 주문 내역 없을 때
          tableDisplay("none", "display");
        } else {
          tableDisplay("display", "none");
          saveData = orderData;
          orderData.forEach(data => {
            let { deliveryStatus, orderProducts, totalPrice, isCanceled, orderDate: date } = data;
            const orderId = data["_id"];
            date = date.toString().substring(0,10);
            addProduct(orderId, date, orderProducts, deliveryStatus, isCanceled, totalPrice);

            if (document.querySelector('.pageNumber') === null) renderPagination(totalPage, currentPage);
          });
        }
    })
    .catch((err) => console.log(err));
}

// 상품 삽입
function addProduct(orderId, orderDate, orderProducts, deliveryStatus, isCanceled, totalPrice) {
  let cnt = 0;
  for (let product of orderProducts) {
    cnt += product.count;
  }
  const product = orderProducts[0].products;
  const size = orderProducts[0].size;
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
      <td class="product-img"><img src=''></td>
      <td class="product-name">${productName}</td>
      <td class="price">${String(totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td class="count">${cnt}</td>
      <td>
        ${
          isCanceled === false ? '<button class="order-cancel">취소 신청</button>' : '-'
        }
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

document.querySelector('.order-tracking-table').addEventListener('click', (e) => {
  if (e.target.className === "order-cancel") {
    cancelOrder(e.target);
  }
})

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
        removeTarget.parentElement.remove();
        window.location.href = `/user/orderTracking/${id}`;
      } else {
        alert(data.errMsg);
      }
    })
    .catch((err) => alert(err));
}

function renderPagination(totalPage, currentPage) {

pageGroup = Math.ceil(currentPage / pageCount); // 현재 페이지 그룹

lastNumber = pageGroup * pageCount // 현재 페이지 그룹의 마지막 숫자
if (lastNumber > totalPage) {
  lastNumber = totalPage;
}

if (totalPage < pageCount || totalPage === pageCount)
  firstNumber = 1;
else firstNumber = lastNumber - (pageCount - 1); // 현재 페이지 그룹의 첫번째 숫자

next = lastNumber + 1;
prev = firstNumber - 1;
let html = "";
if (prev > 0)
    html +=  `<button class="prev">이전</button>`;

for(let i = firstNumber; i <= lastNumber; i++) {
    html += `<button class="pageNumber" id="page_${i}">${i}</button>`
  }
  if (lastNumber < totalPage)
    html += `<button class="next">다음</button>`;

  document.querySelector('.pages').innerHTML = html;
  console.log(document.querySelector(`#page_${currentPage}`))
  document.querySelector(`#page_${currentPage}`).style.color = '#90c0dd';
  document.querySelector('.pages').addEventListener('click', select);
}

function select(e) {
  console.log(e.target);
  if (e.target.className === "pageNumber") {
    currentPage = +(e.target.id.split("_")[1]);
    getOrderData();
    renderPagination(totalPage, currentPage);
  } else if (e.target.className === "prev") {
      currentPage--;
      getOrderData()
      renderPagination(totalPage, currentPage);
  } else if (e.target.className === "next") {
    currentPage++;
    getOrderData();
    renderPagination(totalPage, currentPage);
    }
};
