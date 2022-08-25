import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 0 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '30s', target: 0 }
  ],
//   thresholds: {
//     // We want the 95th percentile of all HTTP request durations to be less than 500ms
//     http_req_duration: ['p(95)<500'],
//     // Thresholds based on the custom metric we defined and use to track application failures
//     http_req_failed: [
//         // Abort the test early if it climbs over 5%
//         { threshold: 'rate<=0.05', abortOnFail: true },
//     ],
// }
};

const patientNames = new Array("fox", "jo", "michael");

let count = 0;
export default function () {
  //params
  
  const res = http.get('http://getting-started:80/hello/'+patientNames[count]);
  count++;
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
  
}


