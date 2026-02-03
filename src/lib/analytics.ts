// 計測イベント送信用ユーティリティ

type EventParams = Record<string, string | number | boolean | undefined>;

export const trackEvent = (eventName: string, params?: EventParams) => {
  // GA4がロードされている場合は gtag を使用
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      'event',
      eventName,
      params
    );
  }

  // 開発環境ではコンソールにも出力
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, params);
  }
};
