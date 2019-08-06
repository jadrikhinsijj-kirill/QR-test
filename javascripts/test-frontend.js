var urlpath = window.location.pathname.split('/');

var id = urlpath[3];
var action = urlpath[4];

console.log("url?", id, action);

switch (action) {
    case 'edit':

        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', '/api/test/'+id, false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // 3. Отсылаем запрос
        xhr.send();

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            console.log("ОШИБКА ПОЛУЧЕНИЯ НОВОСТИ", xhr.statusText);
        } else {
            var test = JSON.parse(xhr.responseText);
            document.getElementById("name").value=test.name;
            document.getElementById("surname").value=test.surname;
        }

        break;
    case 'delete':

        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', '/api/test/'+id, false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // 3. Отсылаем запрос
        xhr.send();

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            console.log("ОШИБКА ПОЛУЧЕНИЯ Ученика", xhr.statusText);
        } else {
            var test = JSON.parse(xhr.responseText);

            document.getElementById("header")
                .innerHTML='Вы действительно хотите удалить ученика "'+test.name+test.surname+'"?';
        }
        break;
}


var btnAddTest =  document.getElementById("add-test-button");
var btnAddTest1 =  document.getElementById("add-test-button1");
var btnAddTest2 =  document.getElementById("add-test-button2");
var btnAddTest3 =  document.getElementById("add-test-button3");
var starttest =  document.getElementById("starttest");
var btnEditTest =  document.getElementById("edit-test-button");
var btnDelTest =  document.getElementById("delete-test-button");
//var btnAddQuestion1 =  document.getElementById("add-question1-button");
//var btnAddQuestion2 =  document.getElementById("add-question2-button");
var fieldId = document.getElementById("id");
if(fieldId){fieldId.value=id;}


if(btnAddTest){
    btnAddTest.addEventListener('click', function () {

        console.log("add-test-button was clicked!");

        var name = document.getElementById('name').value;
        var surname = document.getElementById('surname').value;


        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('POST', '/api/test', false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        var data = JSON.stringify( {
            name: name,
            surname: surname
        });

        // 3. Отсылаем запрос
        xhr.send(data);

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 201) {
            console.log("ОШИБКА ДОБАВЛЕНИЯ НОВОСТИ", xhr.statusText);
        } else {

        }
    });
}

if(btnEditTest){
    btnEditTest.addEventListener('click', function () {

        var name = document.getElementById('name').value;
        var surname = document.getElementById('surname').value;
        var id = document.getElementById('id').value;


        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('PUT', '/api/test/'+id, false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        var data = JSON.stringify( {
            name: name,
            surname: surname
        });

        // 3. Отсылаем запрос
        xhr.send(data);

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            console.log("ОШИБКА ИЗМЕНЕНИЯ НОВОСТИ", xhr.statusText);
        } else {
            document.location.href='/admin/test';
        }

    });
}

if(btnDelTest){
    btnDelTest.addEventListener('click', function () {

        var id = document.getElementById('id').value;

        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('DELETE', '/api/test/'+id, false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // 3. Отсылаем запрос
        xhr.send();

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 201) {
            console.log("ОШИБКА УДАЛЕНИЯ НОВОСТИ", xhr.statusText);
        } else {
            document.location.href='/admin/test';
        }

    });
}
var inc=0;
var b=0;
var divtest;

if(btnAddTest1) {
    btnAddTest1.addEventListener('click', function () {
        inc++;
        b++;
        var i = 0;
        c = document.getElementById('s2').value;
        c = Number(c);
        var newdiv = document.createElement("div");
        newdiv.innerHTML +="<div id='que1'><div id='que'><h6>"+ b + ". </h6></div><div class='input" + inc + "' id='que'><input type='text' size='40' class='form-control' placeholder='Введите вопрос' ></div><div class='text" + inc + " hide' id='que'></div><div class='123'><input type = 'button' value='Сохранить/изменить' class='btn btn-danger' name='" + inc + "' onClick = 'inptext()'></div></div>";
        document.getElementById("qwe").appendChild(newdiv);
        for (i = 0; i < c; i++) {
            inc++;
            newdiv.innerHTML += "<div id='que1'><div id='que'><input name=q" + b + " value='value2' type='radio' id=" + b + "></div><div class='input" + inc + "' id='que'><input type='text' class='form-control' size='30' placeholder='Введите вариант ответа'></div><div class='text" + inc + " hide' id='que'></div><div class='123'> <input type = 'button' value='Сохранить/изменить' class='btn btn-danger' name='" + inc + "' onClick = 'inptext()'></div></div>";
            document.getElementById("qwe").appendChild(newdiv);
        }
        ;
    });
}

if(btnAddTest2) {
    btnAddTest2.addEventListener('click', function () {
        inc++;
        b++;
        c = document.getElementById('s2').value;
        c = Number(c);
        var newdiv = document.createElement("div");
        newdiv.innerHTML += "<div id='que1'><div id='que'><h6>"+ b + ". </h6></div><div class='input" + inc + "' id='que'><input type='text' class='form-control' size='40' placeholder='Введите вопрос' ></div><div class='text" + inc + " hide' id='que'></div><div class='123'><input type = 'button'  value='Сохранить/изменить' class='btn btn-danger' name='" + inc + "' onClick = 'inptext()'></div></div>";
        document.getElementById("qwe").appendChild(newdiv);
        for (var i = 0; i < c; i++) {
            inc++;
            newdiv.innerHTML += "<div id='que1'><div id='que'><input name=q" + b + " value='value2' type='checkbox' id=" + b + "></div><div class='input" + inc + "' id='que'><input type='text' class='form-control' size='30' placeholder='Введите вариант ответа'></div><div class='text" + inc + " hide' id='que'></div><div class='123'><input type = 'button'  value='Сохранить/изменить' class='btn btn-danger' name='" + inc + "' onClick = 'inptext()'></div></div>";
            document.getElementById("qwe").appendChild(newdiv);
        }
        ;
    });
}


if(btnAddTest3) {
    btnAddTest3.addEventListener('click', function () {
        for (var question = 1; question <= b; question++) {
            var q = document.forms['quiz'].elements['q'+question];
            alert(q);
            for (var i = 0; i < q.length; i++) {
                if (q[i].checked) {
                    q[i].value = "value1"
                };
            };
        };

        var elemInput = $('.123');
        $('.123').empty();

        var Time = Number(document.getElementById("time").value);
        localStorage.setItem("time",Time);

        var newdiv1 = document.createElement("div");
        newdiv1.innerHTML +=document.getElementById("qwe").innerHTML;
        newdiv1.innerHTML += "<div id='que1'><input type='button' value='Проверить' onClick = 'check()'></div><div class='diagram'></div>";
        document.getElementById("qwe1").appendChild(newdiv1);
        divtest = document.getElementById('qwe1').innerHTML;
        localStorage.setItem("test",divtest);
        localStorage.setItem("countb",b);

    });
}


function inptext(){
    var namebut= event.target,
        mum=namebut.name,
        elemInput = $('.input'+mum),
        elemText = $('.text'+mum);
    if(elemText.hasClass('hide')) {
        // Если сейчас показан инпут
        var InputVal = elemInput.find('input').val(); // Получаем значения инпута
        elemText.text(InputVal); // Вставляем значение в текст
        elemText.removeClass('hide'); // Показываем текст
        elemInput.addClass('hide'); // Прячем инпут
        $(this).text('Изменить'); // Меняем название кнопки чтобы пользователям было понятнее
    } else if(elemInput.hasClass('hide')) {
        // Если сейчас показан текст
        elemInput.removeClass('hide'); // Показываем инпут
        elemText.addClass('hide'); // Прячем текст
        $(this).text('Сохранить'); // Меняем название кнопки чтобы пользователям было понятнее
    }
}


function check(){
    var question=1;
    var value1=0;
    var value2=0;
    var count1=-1;
    var count2=-1;
    var b=localStorage.getItem("countb");
    for (question = 1; question <= b; question++) {
        var q = document.forms['quiz12'].elements['q'+question];
        for (var i = 0; i < q.length; i++) {
            if (q[i].value=="value1"){
                count1++;
            }
            if ((q[i].checked)&&(count1==i)) {
                count2++;
            }
        }
        if(count1==count2){
            value1++;
        }else{
            value2++;
        }
        count1=-1;
        count2=-1;
    }
//document.getElementById("qwe1").innerHTML+="<br>"
//var newdiv3 = document.createElement("div");
//newdiv3.innerHTML +="Ваш результат "+value1+"/"+b;
//document.getElementById("qwe1").appendChild(newdiv3);


    var otv = [ {name: 'Правильно', num: value1},
        {name: 'Неправильно', num: value2},
        {name : 'Всего', num: b}];

// Enter
    d3.select('div.diagram').selectAll('div').data(otv).enter().append('div').attr('class', 'item')
        .append('div').attr('class', 'data').append('span');

// Update
    d3.select('div.diagram').selectAll('div.item').data(otv)
        .select('div').style('width', function (d) { return (d.num * 30) + 'px';})
        .select('span').text(function (d) { return d.num;});

    d3.select('div.diagram').selectAll('div.item').data(otv).append('div').attr('class', 'name')
        .text(function (d) {return d.name;});

// Exit
    d3.select('div.diagram').selectAll('div.item').data(otv).exit().remove();


}

if(starttest) {
  starttest.addEventListener('click', function () {
      var test1=localStorage.getItem("test");
      document.getElementById('qwe12').innerHTML=test1;
      var time= localStorage.getItem("time");
      document.getElementById("timer1").innerHTML=time;
      document.getElementById("timer2").innerHTML=0;
      setTimeout(timer,1000);
  });
}

function timer(){
    var obj1=document.getElementById('timer1');
    var obj2=document.getElementById('timer2');
    if(obj2.innerHTML==0){
        obj1.innerHTML--;
        obj2.innerHTML=60;
    }
    obj2.innerHTML--;
    if((obj1.innerHTML==0)&&(obj2.innerHTML==0)){
        check();
        setTimeout(function(){},1000);}
    else{setTimeout(timer,1000);}

}