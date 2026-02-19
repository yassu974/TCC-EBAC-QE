import http from 'k6/http';
import { check, sleep } from 'k6';
import { users } from './users.js';

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '2m', target: 20 },
    { duration: '20s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.05']
  }
};

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];

  const payload = {
    username: user.username,
    password: user.password
  };

  const res = http.post(
    'http://localhost/minha-conta/',
    payload
  );

  check(res, {
    'login status 200 ou 302': (r) => r.status === 200 || r.status === 302
  });

  sleep(1);
}