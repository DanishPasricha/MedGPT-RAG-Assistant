const form = document.getElementById('messageForm');
const input = document.getElementById('text');
const messageBoard = document.getElementById('messageBoard');

const messageStyles = {
  user: {
    row: 'message-row message-row--outbound',
    bubble: 'msg_cotainer_send',
    time: 'msg_time_send',
    avatar: 'avatar user-avatar',
    label: 'You'
  },
  bot: {
    row: 'message-row message-row--inbound',
    bubble: 'msg_cotainer',
    time: 'msg_time',
    avatar: 'avatar bot-avatar',
    label: 'M'
  },
  error: {
    row: 'message-row message-row--inbound',
    bubble: 'msg_cotainer error',
    time: 'msg_time',
    avatar: 'avatar bot-avatar',
    label: '!'
  }
};

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const scrollToBottom = () => {
  messageBoard.scrollTop = messageBoard.scrollHeight;
};

const submitButton = form.querySelector('button[type="submit"]');

const appendMessage = (role, text) => {
  const style = messageStyles[role] || messageStyles.bot;
  const row = document.createElement('div');
  row.className = style.row;

  const bubble = document.createElement('div');
  bubble.className = style.bubble;
  bubble.textContent = text;

  const time = document.createElement('span');
  time.className = style.time;
  time.textContent = formatTime(new Date());
  bubble.appendChild(time);

  const avatar = document.createElement('div');
  avatar.className = style.avatar;
  avatar.textContent = style.label;

  if (role === 'user') {
    row.appendChild(bubble);
    row.appendChild(avatar);
  } else {
    row.appendChild(avatar);
    row.appendChild(bubble);
  }

  messageBoard.appendChild(row);
  scrollToBottom();
};

const setFormDisabledState = (isDisabled) => {
  input.disabled = isDisabled;
  submitButton.disabled = isDisabled;
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const rawText = input.value.trim();

  if (!rawText) {
    return;
  }

  appendMessage('user', rawText);
  input.value = '';
  setFormDisabledState(true);

  try {
    const response = await fetch('/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({ msg: rawText })
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.text();
    appendMessage('bot', data);
  } catch (error) {
    console.error('Chat request failed', error);
    appendMessage('error', 'Something went wrong. Please try again.');
  } finally {
    setFormDisabledState(false);
    input.focus();
  }
});

input.focus();
