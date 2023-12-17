## В этой директории ты пишешь свой сервак
сервер запускай на `PORT = 5000`  
вся статика лежит в `../build`

- т.е. у себя ты пишешь
   ```javascript
   app.use(express.json())
   app.use(express.static(path.resolve(__dirname, '../build')))
   ```  

- и по корневому маршруту (`app.get('/', (...)`) ты отдаешь файлик
   ```javascript 
   res.sendFile(path.resolve(__dirname, '../build/index.html')))
   ```