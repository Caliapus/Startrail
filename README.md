# 🔭 Startrail

A lightweight, secure-ish, and installable journaling app designed for personal use. This app lets you capture your thoughts, mood (with a 5-star rating ★★★★★), location, and the timestamp in a simple Material Design-inspired interface.

Entries are saved locally in a `entries.json` file for later manipulation, and archive access can be password-protected.

---

## Demo

👉 [Try the Tiny Web Mood Journal](https://tiny-web-mood-journal.caliap.ro)

![Image](https://github.com/user-attachments/assets/ac94f95e-2a19-42b7-82fd-0361aec77529)
![Image](https://github.com/user-attachments/assets/9533d48e-4498-4af5-b282-de8d31ccdd8e)

---

## Installation

### 1. Clone or copy the project to your PHP-enabled web server

    git clone https://github.com/Caliapus/Tiny-Web-Mood-Journal
 
If you place the app in a subfolder (e.g. example.com/Folder_Name), you'll need to update the start_url and scope in manifest.json accordingly for the App to work properly.

### 2. (Optional) Add password protection

The default password is _password_. To set another one, run define_password.php after changing ```password``` in the line 
```$hash = password_hash('password', PASSWORD_DEFAULT);```. A ```.password``` file will be generated in the same directory with the hashed password. You can delete define_password.php aftewards. 

Or just create yourself a .password file with a hashed password. I don't care. 

If ```.password``` file is missing, the archive opens when you click Show Archive. No questions asked.


##  Features

📝 Quick entries – Capture your thoughts in seconds

⏰ Auto timestamp – Local date and time are saved automatically

🌍 Geolocation support – Automatically suggests your location

⭐ Mood rating – 5-star system to rate your moment

🔒 Optional archive protection – Guard entries behind a password

🧠 Material-inspired UI – Simple, readable, and mobile-friendly

⚙️ Self-hosted – No cloud, no accounts, all local

💾 Offline support-ish – PWA works offline, kinda*

---

  
###  Progressive Web App (PWA)

* Installable on Android, iOS, and desktop (I tried it only on Android.)

* Yes, it works offline — until you try to write. Then, not so much.


###  Mood Rating System

Rating is saved as a number (1–5) in the ```entries.json``` file. 


###  Security

Security on this app is like a lock drawn in impressionist style on a gate: it might fool robots, but it won't stop anyone motivated.

* `.password` and `entries.json` are meant to be blocked by `.htaccess`. (Read: _should be_.)

* Cookies exists, but they're as safe as ice cream cookies in a schoolyard during a mid-June recession.

* No encryption. No authentication tokens. Just vibes.


###  Future Ideas

✏️ Edit/delete entries

📆 Calendar view of moods

🔄 Full offline sync (aka actual offline support)


###  Credits

[@EmSuru](!https://github.com/emsuru) for coming up with the star counting idea and getting me hooked to it. 

City data via cities5000.csv from [cityjs](!https://github.com/MxAshUp/cityjs)

Powered by Caipirinha, OpenAI and ❤️ 





