const puppeteer = require('puppeteer');
const lineReader = require('line-reader');


//Điền tên người dùng và mật khẩu
const user = "";
const pass = "";

const txtUser = "#txtUser";
const txtPass = "#txtPass";
const txtClassId = "#ctl00_PlaceHolderContentArea_ctl00_ctl01_txt_ClassID";

//Sửa lại link đăng ký tín chỉ của năm học hiện tại
const urlCourseResgitration = "https://mydtu.duytan.edu.vn/sites/index.aspx?p=home_registeredall&semesterid=66&yearid=65";

const urlLogin = "https://mydtu.duytan.edu.vn/Signin.aspx";
const urlIndex = "https://mydtu.duytan.edu.vn/Sites/index.aspx?p=home_infowebpart&functionid=88";

var login = async (page) => {
    await page.goto(urlLogin);
    await page.type(txtUser, user);
    await page.type(txtPass, pass);
    try {
        await page.waitForNavigation();
    } catch (error) {
        console.log(error);
    }
}
(async () => {
    const browser = await puppeteer.launch({ headless: false,
        args: [
        '--window-size=1920,1080'
        ], 
        defaultViewport: null 
    });
    const page = await browser.newPage();
    while(page.url() !== urlIndex){
        await login(page);
    }
    if (page.url() === urlIndex){
        page.close();
        await lineReader.eachLine('listclassid.txt', async (classId) => {
            const page = await browser.newPage();
            await page.goto(urlCourseResgitration);
            await page.type(txtClassId, classId);
        });
    }
})();