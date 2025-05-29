let logs = JSON.parse(localStorage.getItem('visitLogs') || '[]');

const sessionStart = new Date().toLocaleString();
logs.push({ visit: sessionStart, clicks: 0 });
localStorage.setItem('visitLogs', JSON.stringify(logs));

document.getElementById('visit-count').textContent = logs.length;

let clickCount = 0;
const clickBtn = document.getElementById('click-btn');

clickBtn.addEventListener('click', () => {
  clickCount++;
  document.getElementById('click-count').textContent = clickCount;

  const logs = JSON.parse(localStorage.getItem('visitLogs') || '[]');
  if (logs.length > 0) {
    logs[logs.length - 1].clicks = clickCount;
    localStorage.setItem('visitLogs', JSON.stringify(logs));
    updateLog();
  }
});

function updateLog() {
  const logList = document.getElementById('log-list');
  logList.innerHTML = '';
  const logs = JSON.parse(localStorage.getItem('visitLogs') || '[]');
  logs.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `Odwiedziny: ${entry.visit} — Kliknięcia: ${entry.clicks}`;
    logList.appendChild(li);
  });

  document.getElementById('visit-count').textContent = logs.length;
}
updateLog();

function resetAll() {
  localStorage.removeItem('visitLogs');
  clickCount = 0;
  location.reload();
}

function resetSessionClicks() {
  clickCount = 0;
  document.getElementById('click-count').textContent = 0;

  const logs = JSON.parse(localStorage.getItem('visitLogs') || '[]');
  if (logs.length > 0) {
    logs[logs.length - 1].clicks = 0;
    localStorage.setItem('visitLogs', JSON.stringify(logs));
    updateLog();
  }
}

function resetLog() {
  const newLog = { visit: new Date().toLocaleString(), clicks: clickCount };
  localStorage.setItem('visitLogs', JSON.stringify([newLog]));
  updateLog();
}
