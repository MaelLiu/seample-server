import requests
import json

# The webhook URL
url = "https://hook.eu2.make.com/wrtswsezv9nshwpugfkaibx6x7iahscm"

# The data to be sent
data = {
    "email": "owen920614@gmail.com"
}

# Custom headers
headers = {
    "Content-Type": "application/json",
    "Custom-Header": "CustomValue",
    # "email": "owen920614@gmail.com"  # Example for Authorization, replace YOUR_TOKEN_HERE with your actual token
}

# Sending a POST request with custom headers
response = requests.post(url+"?email=owen920614@gmail.com", headers=headers)

if response.status_code == 200:
    print("Request sent successfully!")
else:
    print(f"Failed to send request. Status code: {response.status_code}, Response: {response.text}")
