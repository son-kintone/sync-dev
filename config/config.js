/**
 * kintone 앱 설정 페이지 JavaScript
 */

(function () {
  'use strict';

  // 설정 저장 이벤트
  kintone.events.on('app.record.index.edit.submit', function (event) {
    const apiEndpoint = document.getElementById('api-endpoint').value;
    const apiKey = document.getElementById('api-key').value;
    const customMessage = document.getElementById('custom-message').value;

    // 설정값 저장
    const config = {
      apiEndpoint: apiEndpoint,
      apiKey: apiKey,
      customMessage: customMessage
    };

    // 플러그인 설정 저장 (실제로는 kintone 플러그인 API 사용)
    console.log('설정이 저장되었습니다:', config);

    return event;
  });
})();
