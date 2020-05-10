# JavascriptGrader
This project is Javascript automatic code checker. Design for Instructor or Interested person that interested in make exercise code for student to training programming skill in Javascript language.

### When this project ready to use?
JavascriptGrader is currently set milestone for complete at v1.0. Now it have many feature that not complete. So This project ready to use when complete to v1.0.

### Feature
- Login system (complete) -> There is some bug about redirect after register. Another bug is when jwttoken-expired you still use profile page.
- Course, Category and Exercise page (complete) -> Need more design and There is bug at showResultTestCase at Exercise page when pass code to TestCaseRunner and return back Result more than one Exercise by not refresh page by go another page before go back to Exercise page. ResultTestCase will be at wrong exercise.
- TestCaseRunner (70%) -> Function can check code from user and return TestCaseResult but Full system that will be have start code for Admin.
- Admin System (in process) -> System interface help Admin to add course and TestCase comfortable / Currently I make structure for this system but There isn't Interface yet.
- Welcome Page Blog (5%) -> On this projects have welcome page for non-user. This system have small blog for Admin to announce any news.

### How to use code
Although this projects not complete yet. But feel free to use code as you want.
1. After 'git clone' use below command in terminal (Need NPM)
> npm i
2. Go setting at 'database/index.js' change localhost to database domain, user, pass and database name
** You need to create database table according name in 'database/index.js' before run this projects.
3. Go setting at 'client/package.json' change value at proxy to backend server.
4. run below command
> npm run Dev
5. run below command at /client folder
> npm start
