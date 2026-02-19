import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '2m', target: 20 },
    { duration: '20s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<1200'],
    http_req_failed: ['rate<0.05']
  }
};

export default function () {
  const res = http.get('http://localhost/shop/');

  check(res, {
    'status 200': (r) => r.status === 200
  });

  sleep(1);
}