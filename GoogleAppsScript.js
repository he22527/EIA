// ==========================================================================
// Google Apps Script - 免驗證信自動 Email 通知
// ==========================================================================
// 部署步驟：
// 1. 開啟 https://script.google.com/
// 2. 點擊「新增專案」，將此檔案內容完整複製貼上。
// 3. 點擊右上角「部署」->「新增部署」。
// 4. 類型選擇「網頁應用程式」(Web App)。
// 5. 設定：
//    - 專案說明：北投來走走報名通知
//    - 執行身分：我 (您的 Google 帳號)
//    - 誰有權限存取：所有人 (Anyone)
// 6. 點擊「部署」，授予權限，複製產生的「網頁應用程式 URL」。
// 7. 將 URL 貼入網頁報名彈出視窗的「Email 設定」中儲存即可！

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var name = data.name || "未提供姓名";
    var count = data.count || 1;
    
    // 設定收件人信箱 (逗號分隔即可同時寄送)
    var recipients = "taiwan.kwei@ceci.com.tw,g0306@ceci.com.tw,taiwan.kwei@gmail.com";
    
    var subject = "【北投來走走】新報名通知：" + name;
    var body = "您好，收到新的活動報名：\n\n" +
               "姓名：" + name + "\n" +
               "參加人數：" + count + " 人\n" +
               "報名時間：" + new Date().toLocaleString("zh-TW") + "\n\n" +
               "這是一封來自您的網站「北投來走走」的自動報名通知信。";
               
    // 使用 Google 郵件服務寄送信件 (免驗證信，即時寄送)
    MailApp.sendEmail(recipients, subject, body);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Emails sent successfully" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
