
#include <Keypad.h>
#include <Servo.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SPI.h>
#include <SoftwareSerial.h>

#include <MFRC522.h>                 // Khai báo thư viện LCD sử dụng I2C
LiquidCrystal_I2C lcd(0x27, 16, 2);  // 0x27 địa chỉ LCD, 16 cột và 2 hàng

Servo myservo;  //Tạo biến myServo của loại Servo
int e1 = 11;
int e2 = 10;
int i1 = 9;
int i2 = 8;
int ls1 = 7;
int ls2 = 6;  
int RedLed = 20;
int H = 160;
int rls1;
int rls2;
int bt1 = 4;
int x = 0;

//Tạo ký tự đặc biệt &
byte va[] = {
  B00000,
  B01100,
  B10010,
  B10100,
  B01000,
  B10101,
  B10010,
  B01101
};

const byte ROWS = 4;
const byte COLS = 4;
char password[5];
char On_equip[] = "4444";   // Mật khẩu mở cửa
char Off_equip[] = "1111";  // Mật khẩu đóng cửa
int i = 0;
int on = 0;
char MatrixKey[ROWS][COLS] = {
  { '1', '2', '3', 'A' },
  { '4', '5', '6', 'B' },
  { '7', '8', '9', 'C' },
  { '*', '0', '#', 'D' }   
};
byte rowPins[ROWS] = { 14, 15, 16, 17 };  // R1,R2,R3,R4
byte colPins[COLS] = { 18, 19, 2, 3 };    // C1,C2,C3,C4

Keypad Mykeys = Keypad(makeKeymap(MatrixKey), rowPins, colPins, ROWS, COLS);

//=================================================================================================================

// RFID
#define SS_PIN 53
#define RST_PIN 5
MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);  // Khởi tạo cổng giao tiếp với ESP8266
  SPI.begin();
  pinMode(RedLed, OUTPUT);
  pinMode(bt1, INPUT_PULLUP);
  pinMode(ls1, INPUT_PULLUP);
  pinMode(ls2, INPUT_PULLUP);
  lcd.init();             // Khởi tạo màn hình Màn hình
  lcd.backlight();        // Bật đèn màn hình Màn hình
  lcd.createChar(0, va);  // Tạo ký tự đặc biệt &
  lcd.setCursor(5, 0);
  lcd.print("Hello");
  delay(1000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Password or RFID");
  Serial.println("start nano");
  mfrc522.PCD_Init();  // Initiate MFRC522
  Serial.println("Approximate your card to the reader...");
  Serial.println();
  pinMode(8, OUTPUT);
}

void please() {
  lcd.setCursor(0, 0);
  lcd.print("Password or RFID");
}
//=================================================================================================================
void forward() {
  digitalWrite(i1, HIGH);
  digitalWrite(i2, LOW);
  analogWrite(e1, H);
  analogWrite(e2, H);
}
void goback() {
  digitalWrite(i1, LOW);
  digitalWrite(i2, HIGH);
  analogWrite(e1, H);
  analogWrite(e2, H);
}
void stop() {
  digitalWrite(i1, LOW);
  digitalWrite(i2, LOW);
  analogWrite(e1, 0);
  analogWrite(e2, 0);
}

void keypad()

{

  char EnterKey = Mykeys.getKey();

  if (EnterKey) {
    password[i] = EnterKey;  // Nhập lần lượt các ký tự vào biến chuỗi ký tự Psssword
    i++;
    on++;
    Serial.println(password);
    // Nhập mật khẩu
    if (i == 0) {
      password[0] = EnterKey;
      lcd.setCursor(6, 1);
      lcd.print(password[0]);
      delay(500);  // Ký tự hiển thị trên màn hình LCD trong 0.5s
      lcd.setCursor(6, 1);
      lcd.print("*");  // Ký tự được thay bởi dấu *
    }
    if (i == 1) {
      password[1] = EnterKey;
      lcd.setCursor(7, 1);
      lcd.print(password[1]);
      delay(500);
      lcd.setCursor(7, 1);
      lcd.print("*");
    }
    if (i == 2) {
      password[2] = EnterKey;
      lcd.setCursor(8, 1);
      lcd.print(password[2]);
      delay(500);
      lcd.setCursor(8, 1);
      lcd.print("*");
    }
    if (i == 3) {
      password[3] = EnterKey;
      lcd.setCursor(9, 1);
      lcd.print(password[3]);
      delay(500);
      lcd.setCursor(9, 1);
      lcd.print("*");
    }
  }
  if (on == 4) {
    if (!strcmp(password, On_equip)) {
      lcd.clear();
      lcd.print("    Correct!");
      delay(1000);
      lcd.clear();
      lcd.print("      Opened!");
      digitalWrite(RedLed, 1);
      // delay(10000);
      forward();
      Serial.println(rls2);
   while (digitalRead(ls2) == 1) {
  // Chờ cho đến khi rls2 trở thành 0
  delay(10); // Thêm delay nhỏ để tránh việc kiểm tra quá nhanh và giúp hệ thống ổn định
}

if (digitalRead(ls2) == 0) {
  x = 0;
  stop();
}

lcd.clear();
please();
i = 0;
 
    }

    if (!strcmp(password, Off_equip)) {
      lcd.clear();
      // myservo.write(0); // Đóng cửa
      lcd.print("     Closed!");
      digitalWrite(RedLed, LOW);
      goback();
     while (digitalRead(ls1) == 1) {
  // Chờ cho đến khi rls1 trở thành 0
  delay(10); // Thêm delay nhỏ để tránh việc kiểm tra quá nhanh và giúp hệ thống ổn định
}

if (digitalRead(ls1) == 0) {
  x = 1;
  // Serial.println("close door1");
  stop();
}

lcd.clear();
please();
i = 0;

    }

    if (strcmp(password, On_equip)) {
      if (strcmp(password, Off_equip)) {

        lcd.clear();
        lcd.print("   khong dung!");
        delay(1000);
        lcd.clear();
        lcd.print("   thu lai!");
        delay(1000);
        lcd.clear();
        lcd.print(" nhap mat khau");
        i = 0;
        Serial.println(" Sai mat khau nhap lai.............");
        digitalWrite(RedLed, HIGH);
      }
    }
    on = 0;
  }
}

void control_closedoor() {
  if (x == 0) {
  // Serial.println("close door");
  goback(); // Giả sử hàm goback() di chuyển cửa về vị trí đóng
  while (digitalRead(ls1) == 1) {
    // Chờ cho đến khi cảm biến ls1 thay đổi giá trị (từ 1 về 0)
    delay(10); // Thêm thời gian delay để tránh kiểm tra quá nhanh
  }
  if (digitalRead(ls1) == 0) {
    stop(); // Dừng động cơ khi cửa đã đóng
    x = 1; // Đổi trạng thái cửa sang mở
  }
  
} else if (x == 1) {
  // Serial.println("open door");
  forward(); // Giả sử hàm forward() di chuyển cửa ra ngoài
  while (digitalRead(ls2) == 1) {
    // Chờ cho đến khi cảm biến ls2 thay đổi giá trị (từ 1 về 0)
    delay(10); // Thêm thời gian delay để tránh kiểm tra quá nhanh
  }
  if (digitalRead(ls2) == 0) {
    stop(); // Dừng động cơ khi cửa đã mở hoàn toàn
    x = 0; // Đổi trạng thái cửa sang đóng
  }
}

}
void closedoor() {
  if (digitalRead(bt1) == 0) {
    while (1) {
      if (digitalRead(bt1) == 1) {
        control_closedoor();
        delay(300);
        break;
      }
    }
  }
}
//RFID
void cardRFID() {
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
  // Select one of the cards
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }
  // Show UID on serial monitor
  Serial.print("UID tag :");
  String content = "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  Serial.print("Message : ");
  content.toUpperCase();

  // Check for the new UID values
  if (content.substring(1) == "1A 71 0F 3F" || content.substring(1) == "69 A1 52 18") {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("   THE HOP LE");
    Serial.println("Authorized access");
    Serial.println();
    digitalWrite(8, 1);
    delay(500);
    digitalWrite(8, 0);
    lcd.clear();
    lcd.setCursor(4, 0);
    lcd.print("MO CUA ");
    forward();
while (digitalRead(ls2) != 0) {  // Kiểm tra khi cửa chưa mở hẳn
  // Bạn có thể thêm các xử lý khác ở đây nếu cần
}
if (digitalRead(ls2) == 0) {  // Khi cửa đã mở hoàn toàn (rls2 == 0)
  x = 0;  // Cập nhật trạng thái cửa là mở
  stop();  // Dừng động cơ
}

lcd.clear();  // Xóa màn hình LCD
please();     // Hiển thị trạng thái cửa
  } else {
    lcd.clear();
    lcd.setCursor(2, 0);
    lcd.print("THE KHONG HOP LE");
    lcd.setCursor(0, 1);
    lcd.print(" QUYET LAI THE");
    delay(2000);
    lcd.clear();
    please();
    Serial.println(" Access denied");
  }
}


 bool waitingForRLS2 = false;  // Trạng thái đang chờ rls2 = 0
String currentCommand = "";   // Lệnh hiện tại từ ESP

void checkESPCommand() {
  if (Serial1.available() > 0) {                     
    String command = Serial1.readStringUntil('\n');  
    command.trim();                                  
    Serial.println(command);

    // Chỉ xử lý khi lệnh thay đổi
    if (command != currentCommand) {
      currentCommand = command; // Cập nhật lệnh hiện tại
      
      if (command == "ON") {
        lcd.clear();
        lcd.print("ESP: Open Door");
        
        // Kiểm tra trạng thái cửa và mở cửa nếu cần
        if (x == 1) {
          forward();  // Mở cửa
          while (rls2) { rls2 = digitalRead(ls2); }  // Chờ cửa mở hoàn toàn
          if (rls2 == 0) {
            stop();
            x = 0;  // Cập nhật trạng thái cửa mở
          }
        }
        
        waitingForRLS2 = true;  // Bắt đầu kiểm tra rls2
      } else if (command == "OFF") {
        lcd.clear();
        lcd.print("ESP: Close Door");
        
        // Kiểm tra trạng thái cửa và đóng cửa nếu cần
        if (x == 0) {
          goback();  // Đóng cửa
          while (rls1) { rls1 = digitalRead(ls1); }  // Chờ cửa đóng hoàn toàn
          if (rls1 == 0) {
            stop();
            x = 1;  // Cập nhật trạng thái cửa đóng
          }
        }

        waitingForRLS2 = false;  // Hủy kiểm tra rls2
        stop();  // Dừng động cơ
      }
      
      lcd.clear();
      please();  // Hiển thị trạng thái
    }
  }

  // Kiểm tra trạng thái rls2 khi đang mở cửa
  if (waitingForRLS2) {
    if (digitalRead(ls2) == 0) {  // Nếu rls2 = 0
      stop();  // Dừng động cơ
      lcd.clear();
      lcd.print("Door Stopped");
      waitingForRLS2 = false;  // Ngừng kiểm tra rls2
      // Chờ lệnh mới từ ESP
    }
  }
}


void loop() {
  rls1 = digitalRead(ls1);
  rls2 = digitalRead(ls2);

  // Gửi trạng thái qua Serial (ESP8266) vậy này là gì
  Serial.println(rls1);
  Serial.println(rls2);
  closedoor();
  keypad();
  cardRFID();
  checkESPCommand();  // Kiểm tra lệnh từ ESP8266
}
