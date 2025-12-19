/**
 * kintone Mobile 커스터마이제이션
 * 모바일 환경에서 실행되는 JavaScript 코드
 */

(function () {
  'use strict';

  // kintone 이벤트: 모바일 레코드 목록 화면 표시 후
  kintone.events.on('mobile.app.record.index.show', function (event) {
    console.log('📱 모바일 레코드 목록 화면이 표시되었습니다.');

    return event;
  });

  // kintone 이벤트: 모바일 레코드 상세 화면 표시 후
  kintone.events.on('mobile.app.record.detail.show', function (event) {
    console.log('📱 모바일 레코드 상세 화면이 표시되었습니다.');
    console.log('레코드 데이터:', event.record);

    return event;
  });

  // kintone 이벤트: 모바일 레코드 편집 화면 표시 후
  kintone.events.on(['mobile.app.record.create.show', 'mobile.app.record.edit.show'], function (event) {
    console.log('📱 모바일 레코드 편집 화면이 표시되었습니다.');

    return event;
  });

  console.log('✅ kintone Mobile 커스터마이제이션이 로드되었습니다.');
})();
