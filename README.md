### 支出記帳網站
這是一個使用 Node.js + Express 打造的支出紀錄網站

### Features
1. 使用者可以在首頁看到所有支出紀錄
2. 使用者可以編輯支出紀錄
3. 使用者可以刪除任一支出紀錄
4. 使用者可以新增支出紀錄
5. 使用者可以透過下拉選單來篩選出特定類別的支出紀錄，上方金額也會顯示該類別的總金額
6. 使用者可以在首頁看到所有的支出金額
7. 使用者需要先註冊帳號再登入，才可以使用上述功能
8. 使用者可藉由facebook註冊帳號並登入

可供使用的帳號/密碼
帳號: 'root@example.com'
密碼: '12345678

### Environment SetUp
bcryptjs
body-parser
connect-flash
dotenv
express
express-handlebars
express-session
method-override
mongoose
passport
passport-facebook
passport-local

### Installation and Execution
1. 開啟 terminal，並Clone 此專案至本機電腦
2. 進入存放此專案的資料夾
3. 安裝套件 (npm install)
4. 透過npm run seed 來建立資料，再藉由npm run dev來執行專案 
5. 執行專案，並可使用瀏覽器輸入網址"http://localhost:3000"來開啟網頁
