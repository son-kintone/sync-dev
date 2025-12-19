/**
 * kintone 공통 유틸리티 함수
 */

const KintoneUtils = {
  /**
   * kintone REST API 클라이언트 초기화
   */
  getClient: function () {
    return new KintoneRestAPIClient();
  },

  /**
   * 레코드 조회
   */
  getRecords: async function (appId, query = '') {
    try {
      const client = this.getClient();
      const resp = await client.record.getRecords({
        app: appId,
        query: query
      });
      return resp.records;
    } catch (error) {
      console.error('레코드 조회 실패:', error);
      throw error;
    }
  },

  /**
   * 레코드 추가
   */
  addRecord: async function (appId, record) {
    try {
      const client = this.getClient();
      const resp = await client.record.addRecord({
        app: appId,
        record: record
      });
      return resp;
    } catch (error) {
      console.error('레코드 추가 실패:', error);
      throw error;
    }
  },

  /**
   * 레코드 업데이트
   */
  updateRecord: async function (appId, recordId, record) {
    try {
      const client = this.getClient();
      const resp = await client.record.updateRecord({
        app: appId,
        id: recordId,
        record: record
      });
      return resp;
    } catch (error) {
      console.error('레코드 업데이트 실패:', error);
      throw error;
    }
  },

  /**
   * 날짜 포맷팅
   */
  formatDate: function (date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
};

// 전역 객체로 노출
if (typeof window !== 'undefined') {
  window.KintoneUtils = KintoneUtils;
}
