<?php
$hash = password_hash('password', PASSWORD_DEFAULT);
file_put_contents('.password', $hash);