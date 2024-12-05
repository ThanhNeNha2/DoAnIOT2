#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <SoftwareSerial.h>

// Insert your network credentials
#define WIFI_SSID "LAU 3_2"
#define WIFI_PASSWORD "0914083177"

// Insert Firebase project API Key
#define API_KEY "AIzaSyDBBuB8Ps4eupVk_hR1FW3YYAV8Qmtw5O4"

// Insert RTDB URL
#define DATABASE_URL "cuaiot-default-rtdb.firebaseio.com"

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;
#define TX D6  // GPIO4
#define RX D5  // GPIO5
SoftwareSerial mySerial(RX, TX);
// mình cắm chân tx rx gnd 3 chân đó á b
unsigned long readDataPrevMillis = 0;
bool signupOK = false;

void doorOn() {
  Serial.print("Cua dang mo");
}

void doorOff() {
  Serial.print("Cua dang dong");
}

void setup() {
  // Đổi baud rate ở đây
  Serial.begin(9600);
  mySerial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  // Assign the api key (required)
  config.api_key = API_KEY;

  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;

  // Sign up
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase Sign Up OK");
    signupOK = true;
  } else {
    Serial.printf("Sign Up Failed: %s\n", config.signer.signupError.message.c_str());
  }

  // Assign the callback function for the token generation task
  config.token_status_callback = tokenStatusCallback;  // see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (millis() - readDataPrevMillis > 2000) {  // Kiểm tra 2 giây/lần
    readDataPrevMillis = millis();

    // Đọc giá trị của nút "DOOR" từ Firebase
    if (Firebase.RTDB.getString(&fbdo, "/DOOR")) {
      String doorStatus = fbdo.stringData();
      Serial.print("Current Door Status: ");
      Serial.println(doorStatus);

      // Gửi tín hiệu ON/OFF qua Serial
      if (doorStatus == "ON") {
        mySerial.println("ON");  // Kèm theo '\n'
      } else if (doorStatus == "OFF") {
        mySerial.println("OFF");  // Kèm theo '\n'
      }
    } else {
      Serial.printf("Failed to get data: %s\n", fbdo.errorReason().c_str());
    }
  }
}
