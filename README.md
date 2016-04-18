# Kii Corp front-end project framework

## Prerequisite
 - 1. install ```npm > 5.0```. In mac, run ```$ brew install npm```. (if you have installed home brew). Or download from [here]( https://www.npmjs.com/)..
 - 2. install ```gulp```, by running ```$ sudo npm install gulp -g```
 - 3. install ```bower```, by running ```$ sudo npm install -g bower```
 - 4. install ```express```, by running ```$ sudo npm install -g expree```
 
if you are using linux or windows, please install ```ruby``` 

## initialize project

go to server directory:

```$ cd front-end-template/server```

install node packages

```npm install```

run application

```node bin/www```

go back 

```$ cd ..```

go to client directory:

```$ cd front-end-template/client```

update npm packages

```$ npm update ```

install libs

```$ bower install ```

now, open client/bower_components/bootstrap/bower.json with your favorite text editor, and find below content.
```json
"main": [
  "less/bootstrap.less",
  "dist/js/bootstrap.js"
]
```
then edit this block as following.

```json
"main": [
  "less/bootstrap.less",
  "dist/js/bootstrap.js",
  "dist/css/bootstrap.css"
]
```
  

inject dependencies

```$ gulp ```

Now, all good! You should be able to visible this site through [http://localhost:8080/index.html](http://localhost:8080/index.html)

Next time when you need to run this project:

```$ node front-end-template/server/bin/www```

```$ cd front-end-template/client/```

```$ gulp```



