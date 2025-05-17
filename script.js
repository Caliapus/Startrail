// Load city data when DOM is ready
let latestCoords = null; 
let locationInput;
window.addEventListener('DOMContentLoaded', () => {
  loadCities(); // Assumes function is defined in city.js

  // ----- Helper Functions -----

  function formatDateTimeForDisplay(isoString) {
    const date = new Date(isoString);

    const dateFormatter = new Intl.DateTimeFormat('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const timeFormatter = new Intl.DateTimeFormat('ro-RO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    return {
      date: dateFormatter.format(date),
      time: timeFormatter.format(date)
    };
  }

  function showSnackbar(message, isError = false) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.classList.remove('success', 'error', 'show');
    snackbar.classList.add(isError ? 'error' : 'success', 'show');
    setTimeout(() => snackbar.classList.remove('show'), 3000);
  }

function saveEntry(entryData) {
  fetch('save_entry.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entryData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showSnackbar('Entry saved successfully!', false);

        const entryElement = document.createElement('div');
        entryElement.classList.add('entry', 'fade-in-start'); // Start hidden

        const formattedInput = entryData.input.replace(/\n/g, '<br>');
        const { date, time } = formatDateTimeForDisplay(entryData.time);

        const rating = entryData.rating || 0;
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
          starsHTML += `<span class="entry-star ${i <= rating ? 'filled' : 'empty'}">★</span>`;
        }

        entryElement.innerHTML = `
          <p><strong>${entryData.location}</strong>, ${date}, ${time}</p>
          <div class="entry-rating">${starsHTML}</div>
          <p>${formattedInput}</p>`;

        const entriesSection = document.getElementById('entries');
        if (entriesSection) {
          entriesSection.insertBefore(entryElement, entriesSection.firstChild);

          // Add a slight delay for Firefox to register the new element
          setTimeout(() => {
            entryElement.classList.remove('fade-in-start');
          }, 10);  // 10ms delay
        } else {
          console.error('entriesSection not found.');
        }
      } else {
        console.error('Error saving entry:', data.message);
        showSnackbar('Failed to save entry. See the console.', true);
      }
    })
    .catch(err => {
      console.error('Error saving entry:', err);
      showSnackbar('Failed to save entry. See the console.', true);
    });
}



function loadEntries(triggeredByToggle = false) {
  fetch('load_entries.php')
    .then(response => {
      if (!response.ok) {
        if (response.status === 403) {
          if (triggeredByToggle) {
            passwordInput.style.display = 'inline-block';
            passwordInput.focus();
          } else {
            showSnackbar('Access denied: archive is protected.', true);
          }
        } else {
          showSnackbar('Failed to load entries.', true);
        }
        return Promise.reject(new Error(`HTTP ${response.status}`));
      }
      return response.json();
    })
    .then(data => {
      entriesSection.innerHTML = '';
      data.reverse().forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('entry');

        const formattedInput = entry.input.replace(/\n/g, '<br>');
        const { date, time } = formatDateTimeForDisplay(entry.time);

        // Build rating stars HTML
        const rating = Number(entry.rating) || 0;
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
          starsHTML += `<span class="entry-star ${i <= rating ? 'filled' : 'empty'}">★</span>`;
        }

        entryElement.innerHTML = `
          <p><strong>${entry.location}</strong>, ${date}, ${time}</p>
          <div class="entry-rating">${starsHTML}</div>
          <p>${formattedInput}</p>
        `;

        entriesSection.appendChild(entryElement);
      });

      archiveContainer.style.display = 'block';
      toggleButton.style.display = 'inline-block';
      toggleButton.textContent = 'Hide Archive';
    })
    .catch(error => {
      console.error('Error loading entries:', error);
    });
}


  function validatePassword() {
    const userPassword = passwordInput.value;
    if (userPassword) {
      fetch('check_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password: userPassword })
      })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            loadEntries();
            passwordInput.style.display = 'none';
          } else {
            showSnackbar('Incorrect password.', true);
          }
        })
        .catch(err => {
          console.error("Password check error:", err);
          showSnackbar('Password check failed.', true);
        });
    }
  }

  function checkPasswordProtection() {
    fetch('check_password_protection.php')
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (data.passwordRequired && !data.authenticated) {
            lockIcon.style.display = 'inline-block';
          } else {
            lockIcon.style.display = 'none';
          }
        } else {
          console.error('Invalid response from protection check');
        }
      })
      .catch(err => console.error('Error checking protection:', err));
  }

  // ----- DOM Elements & Setup -----
  

  const journalInput = document.getElementById('entryInput');
  const saveButton = document.getElementById('save-entry');
  const entriesSection = document.getElementById('entries');
  const timeInput = document.getElementById("entryTime");
  const locationInput = document.getElementById("entryLocation");
  const timeGroup = timeInput.closest('.group');
  const locationGroup = locationInput.closest('.group');
  const headerGroup = document.querySelector('.header-group');
  const ratingGroup = document.querySelector('.rating-group');
  const lockIcon = document.getElementById('lock-icon');

  const toggleButton = document.getElementById('toggle-archive');
  const archiveContainer = document.getElementById('archiveContainer');
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.placeholder = 'password';
  passwordInput.id = 'passwordinput';
  toggleButton.parentNode.appendChild(passwordInput);

  // ----- Initial State -----
  // ----- Check Archive Lock Status ----- 
  checkPasswordProtection();
  timeInput.value = '';
  locationInput.value = '';
  document.getElementById('entryIsoTime').value = new Date().toISOString();

  const { date, time } = formatDateTimeForDisplay(new Date().toISOString());
  timeInput.value = `${date}, ${time}`;

  // ----- UI Behavior -----


  locationInput.addEventListener('focus', () => locationInput.select()); // if one wants to manually set the location

  journalInput.addEventListener('focus', () => updateDimming(true));
  journalInput.addEventListener('blur', () => updateDimming(false));

  passwordInput.addEventListener('focus', () => passwordInput.select());
  passwordInput.addEventListener('blur', () => {
    if (!passwordInput.value) {
      passwordInput.style.display = 'none';
      toggleButton.style.display = 'inline-block';
    }
  });
  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') validatePassword();
  });

  function updateDimming(active) {
    const method = active ? 'add' : 'remove';
    timeGroup.classList[method]('dimmed');
    locationGroup.classList[method]('dimmed');
    headerGroup.classList[method]('dimmed');
    ratingGroup.classList[method]('dimmed'); 
  }

  // ----- Event Handlers -----

  saveButton.addEventListener('click', () => {
    const entry = journalInput.value.trim();
    if (!entry) return;

    const isoTimeToSave = document.getElementById('entryIsoTime').value;
    const final_location = document.getElementById('entryLocation').value;
    const rating = document.getElementById('entryRating').value;

    saveEntry({
      time: isoTimeToSave,
      location: final_location,
      input: entry,
      rating: rating  // NEW: send rating to server
    });

    journalInput.value = '';
    updateDimming(false);
  });

  toggleButton.addEventListener('click', () => {
    if (passwordInput.style.display === 'inline-block') {
      validatePassword();
    } else {
      const isVisible = archiveContainer.style.display !== 'none';
      if (!isVisible) {
        loadEntries(true);
      } else {
        archiveContainer.style.display = 'none';
        toggleButton.textContent = 'Show Archive';
      }
    }
  });

  // ----- Geolocation -----



if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude } = pos.coords;
      latestCoords = { latitude, longitude };

      // Step 1: Show fallback Lat/Lon immediately
      locationInput.value = `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`;

      // Step 2: Retry getCity until city data is ready
      const interval = setInterval(() => {
        if (cities.length) {
          const city = getCity(latitude, longitude);
          if (city) {
            locationInput.value = city.name;
            clearInterval(interval);
          }
        }
      }, 100); // check every 100ms
    },
    err => {
      locationInput.value = "Location unavailable";
      console.warn("Geolocation error:", err.message);
    }
  );
} else {
  locationInput.value = "Geolocation not supported";
}


  
// Stars logic //


  const stars = document.querySelectorAll('#starRating .star');
  const ratingInput = document.getElementById('entryRating');

  let currentRating = 0;

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.dataset.value);
      highlightStars(val);
    });

    star.addEventListener('mouseout', () => {
      highlightStars(currentRating);
    });

    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.value);
      ratingInput.value = currentRating;
      highlightStars(currentRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach(star => {
      const starVal = parseInt(star.dataset.value);
      star.classList.toggle('hovered', starVal <= rating);
      star.classList.toggle('selected', starVal <= rating);
    });
  }



});
