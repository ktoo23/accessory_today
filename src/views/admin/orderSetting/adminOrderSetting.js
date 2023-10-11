window.addEventListener("DOMContentLoaded", async () => {
  getAllOrderList();
});

// 모든 주문 정보들을 fetch해오는 함수 (관리자 검증까지 함)
async function getAllOrderList() {
  const token = localStorage.getItem("Authorization") || null;
  if (!token) {
    alert("접근 권한이 없습니다.");
    window.location.href = "/";
    return;
  }
  await fetch("/api/orders/setting", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 200) {
        showOrderInfo(data.allOrders);
      } else {
        alert(data.errMsg);
        window.location.href = "/";
      }
    })
    .catch((err) => console.log(err));

  const buttons = document.querySelectorAll("button");
  for (let button of buttons) {
    if (button.id === "delete") {
      button.addEventListener("click", deleteOrder);
    } else if (button.id === "change") {
      button.addEventListener("click", changeDeliveryStatus);
    }
  }
}

// 화면에 모든 주문 정보들을 보여주기 위한 함수
function showOrderInfo(allOrders) {
  console.log(allOrders);
  const orderTable = document.querySelector(".order-table");
  const orderDiv = document.querySelector(".order-div");

  if (!allOrders) {
    orderDiv.innerHTML += `<h3 style='text-align: center; margin-top: 30px; color: grey'>주문 내역이 없습니다.</h3>`;
    return;
  }

  for (let i = 0; i < allOrders.length; i++) {
    const order = allOrders[i];
    const orderProduct = order.orderProducts[0];
    const itemName =
      order.orderProducts.length > 1
        ? `${orderProduct.products.productName}-${orderProduct.size} 외 ${
            order.orderProducts.length - 1
          }개 품목`
        : `${orderProduct.products.productName}-${orderProduct.size}`;
    let totalPrice = 0;
    let totalCount = 0;
    for (let product of order.orderProducts) {
      totalPrice += product.count * product.products.price;
      totalCount += product.count;
    }

    orderTable.innerHTML += `<tr id="order${i}">
    <td>${order._id}</td>
    <td><img src=${orderProduct.products.productImg} /></td>
    <td>${itemName}</td>
    <td>${totalPrice}</td>
    <td>${totalCount}</td>
    <td>${order.orderer}</td>
    <td>
      <button id='delete'>주문 삭제</button>
    </td>
    <td>
      <select>
        <option value="주문 완료" ${
          order.deliveryStatus === "주문 완료" ? "selected" : null
        }>주문 완료</option>
        <option value="배송 준비중" ${
          order.deliveryStatus === "배송 준비중" ? "selected" : null
        }>배송 준비중</option>
        <option value="배송중" ${
          order.deliveryStatus === "배송중" ? "selected" : null
        }>배송중</option>
        <option value="배송 완료" ${
          order.deliveryStatus === "배송 완료" ? "selected" : null
        }>배송 완료</option>
      </select>
    </td>
    <td>
      <button id='change'>변경</button>
    </td>
  </tr>`;
  }
}

// 배송 상태를 변경하는 함수
async function changeDeliveryStatus(e) {
  const change = confirm("해당 상품의 배송 상태를 변경하시겠습니까?");
  if (change) {
    const targetOrderId =
      e.target.parentElement.parentElement.firstElementChild.innerText;
    const status =
      e.target.parentElement.previousElementSibling.firstElementChild.value;
    const patchData = { deliveryStatus: status };
    await fetch(`/api/orders/${targetOrderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          alert(data.errMsg);
        } else {
          alert(data.message);
          window.location.href = "/admin/order-setting";
        }
      })
      .catch((err) => alert(err));
  }
}

// 배송 완료된 상품의 주문을 삭제할 수 있는 함수
async function deleteOrder(e) {
  const deleteOrder = confirm("해당 주문을 삭제하시겠습니까?");
  if (deleteOrder) {
    const targetOrderId =
      e.target.parentElement.parentElement.firstElementChild.innerText;
    await fetch(`/api/orders/${targetOrderId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          alert(data.errMsg);
        } else {
          alert(data.message);
          window.location.href = "/admin/order-setting";
        }
      })
      .catch((err) => alert(err));
  }
}
