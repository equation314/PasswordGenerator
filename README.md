# Password Generator

A secure password generator based on HMAC-SHA3, including web, [Chrome Apps](https://developer.chrome.com/apps/about_apps) and [Chrome extensions](https://developer.chrome.com/extensions) version.

## Algorithm

1. Use the **domain name** as the message.
2. Use the **input password** as the key.
3. Use the `CryptoJS.HmacSHA3()` function in [CryptoJS](https://code.google.com/archive/p/crypto-js/) library with default parameters to generate the MAC (Message Authentication Code), the output size is 512 bits.
4. Convert the MAC into Base64 encoding.
5. Take the last 16 characters (excluding the `'='`) as the **output password**.
