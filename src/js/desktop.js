/**
 * kintone Desktop 커스터마이제이션
 * 데스크톱 환경에서 실행되는 JavaScript 코드
 */

(function () {
  'use strict';

  // kintone 이벤트: 레코드 목록 화면 표시 후
  kintone.events.on('app.record.index.show', function (event) {
    console.log('📋 레코드 목록 화면이 표시되었습니다.');
    
    // 여기에 커스텀 로직 추가
    // 예: 사용자 정의 버튼 추가
    const header = kintone.app.getHeaderMenuSpaceElement();
    if (header) {
      const button = document.createElement('button');
      button.innerText = '커스텀 버튼';
      button.className = 'custom-button';
      button.onclick = function () {
        alert('커스텀 버튼이 클릭되었습니다!');
      };
      header.appendChild(button);
    }

    return event;
  });

  // kintone 이벤트: 레코드 상세 화면 표시 후
  kintone.events.on('app.record.detail.show', function (event) {
    console.log('📄 레코드 상세 화면이 표시되었습니다.');
    console.log('레코드 데이터:', event.record);

    return event;
  });

  // kintone 이벤트: 레코드 편집 화면 표시 후
  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], function (event) {
    console.log('✏️ 레코드 편집 화면이 표시되었습니다.');

    // 필드 값 유효성 검사 예제
    const record = event.record;
    
    return event;
  });

  // kintone 이벤트: 레코드 저장 전
  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], function (event) {
    console.log('💾 레코드 저장 전 이벤트');

    const record = event.record;

    // 유효성 검사 예제
    if (!record.title || !record.title.value) {
      event.error = '제목은 필수 항목입니다.';
      return event;
    }

    return event;
  });

  console.log('✅ kintone Desktop 커스터마이제이션이 로드되었습니다.');
})();
