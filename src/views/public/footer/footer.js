let footerEl = `
    <p>평일 낮 13:00 ~ 밤 21:00 주말 및 공휴일 휴무</p>
    <p>운영시간외에 고객문의 게시판에 문의해 주시기 바랍니다.</p>
    <div class="footer-info">
      <p>
        회사명 : accessory__today 대표 : 1팀 대표전화: 0000-0000 사업자 등록번호
        안내 : [사업자정보확인]
      </p>
      <p>주소 : 성수 낙낙 통신판매업 신고: 2023-성수낙낙-1212호</p>
      <p>개인정보보호책임자: 1팀(elice01@elice.com)</p>
      <p>
        고객님은 안전거래를 위한 현금 등으로 결제 시 저희 쇼핑몰에서 가입한
        PG에스크로 구매안전서비스를 이용하실 수 있습니다.[서비스 가입사실확인]
      </p>
    </div>
    <div class="footer-link">
      <p>회사 소개</p>
      <p>이용약관</p>
      <p>쇼핑몰 이용안내</p>
      <p>개인정보처리방침</p>
    </div>
    <div>
      <p>(C)accessory__today.ALL RIGHTS RESERVED.</p>
    </div>
`;

    const initFooter = () => {
        const targetEl = document.getElementById('footer');
        if(targetEl) {
            targetEl.innerHTML = footerEl;
        } else {
            console.error('targetEl not found');
        }
      };

      initFooter();