# 🔭 Startrail

A lightweight, secure-ish, and installable journaling app designed for personal use. This app  captures one's thoughts, mood (with a 5-star rating ★★★★★), location, and the timestamp in a simple Material Design-inspired interface.

Entries are saved locally in a json file for later manipulation, and archive access can be password-protected.

---

## Demo

👉 [Try Startrail](https://startrail.caliap.ro) (default password: _password_. Non-persistent entries)

<img src="https://github.com/user-attachments/assets/9533d48e-4498-4af5-b282-de8d31ccdd8e" width="300" style="display: block; margin: 0 auto;">

---

## Installation

### 1. Clone or copy the project to one's PHP-enabled web server

    git clone https://github.com/Caliapus/Startrail
 
If one places the app in a subfolder (e.g. example.com/Folder_Name), the `start_url` and `scope` should be updated accordingly in `manifest.json` for the App to work properly.

### 2. (Optional) Add password protection

The default password is _password_. To set another one, run `/php/auth/define_password.php` after changing ```password``` in the line 
```$hash = password_hash('password', PASSWORD_DEFAULT);```. The ```.password``` file will be regenerated with the new hashed password. One can delete `define_password.php` aftewards. 

Or on can just create the `/php/auth/.password` file with a hashed password. I don't care. 

If ```.password``` file is missing, the archive opens when one clicks Show Archive. No questions asked.


##  Features

📝 Quick entries – Capture one's thoughts on the moment

⏰ Auto timestamp – Local date and time are saved automatically

🌍 Geolocation support – Automatically suggests one's location

⭐ Mood rating – 5-star system to rate one's moment. 

🔒 Optional archive protection – Guard entries behind a password

🧠 Material-inspired UI – Simple, readable, and mobile-friendly

⚙️ Self-hosted – No cloud, no accounts, all local

💾 Offline support-ish – PWA works offline, kinda*

---

  
###  Progressive Web App (PWA)

* Installable on Android, iOS, and desktop (I tried it only on Android.)

* Yes, it works offline — until one tries to submit the entry. Then, not so much.


###  Mood Rating System

The location, the local time (when the page was opened), the rating (a number from 1 to 5) also the journal entry are saved in the ```entries.json``` file;

One can disable the possibity of rating from the first line in `scripts\main.js`. In this case the journaling app will be a simpler journaling app. 📝 

`const stars_present = true; // Change to false to disable stars/rating`

###  Security

Security in this app is like a lock drawn in impressionist style on a gate ️: it might fool robots, but it won't stop anyone half-motivated.

* `.password` and `entries.json` are meant to be blocked by `.htaccess`. (Read: _should be_.)

* Cookies exists, but they're as safe as ice cream cookies in a schoolyard during a mid-June recession.

* No encryption. No authentication tokens. Just vibes. ☮️


###  Future Ideas

<s>🚨 When enabled, the rating input should be compulsory.</s> ✔️

✏️ Edit/delete entries

📆 Calendar view of moods (and journal entries)

🔄 Full offline sync (aka actual offline support)


###  Credits

[@EmSuru](https://github.com/emsuru) for coming up with the star counting idea and getting me hooked to it. 

City data via cities5000.csv from [cityjs](https://github.com/MxAshUp/cityjs)

Powered by Caipirinha, OpenAI and ❤️ 





