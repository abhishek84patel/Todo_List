
const inputText = document.body.children[0].children[1];
const TodoList = document.querySelector('.itemList');
var addMsg = document.querySelector('.add');
let obj = JSON.parse(localStorage.getItem('1')) || [];
const itemList1 = document.querySelector('.itemList')


function checkData() {
    JSON.parse(localStorage.getItem('1'))[0] ? fetchData() : itemList1.innerHTML = `<img src="no_data_found.png" width="100%" alt="">`

}
checkData()

function fetchData() {
    TodoList.innerHTML = ''
    JSON.parse(localStorage.getItem('1')).forEach((element, index) => {


        TodoList.innerHTML += `
        <div class='list'> <span class='sr-n' > ${index + 1}</span>
        <input type='checkbox' class='check'> <p>  ${element.name} </p> <button>Delete</button>
        <span style='margin-inline:10px ' class="update-btn" > edit </span>

        </div>`
        removeItem();
        update();
    });
}





inputText.addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        console.log('it is enter key')
        !inputText.value ? emptyInputAlert() : getSetFun();
        inputText.value = null;

    }

})

function emptyInputAlert() {
    addMsg.innerHTML = `<h4> enter some text</h4>`
    addMsg.classList.add('del-active')
    setTimeout(() => {
        addMsg.classList.remove('del-active')
    }, 2000)

}


function getSetFun() {
    setData()
    fetchData()
}

function setData() {

    obj.push({ name: inputText.value })
    localStorage.setItem('1', JSON.stringify(obj))
    addMsg.innerHTML = `   <h4>todo item add</h4>`
    addMsg.classList.add('active')

    setTimeout(() => {
        addMsg.classList.remove('active')
    }, 2000)


}

function removeItem() {
    const itemList = document.querySelectorAll('.itemList > div')

    itemList.forEach((el, index) => {


        el.querySelector(`input[type='checkbox']`).addEventListener('click', (e) => {

            let btn = el.querySelector('button');
            if (e.target.checked) {
                el.querySelector('p').style = 'text-decoration: line-through; color:#808080bf;'
                btn.addEventListener('click', (e) => {

                    if (el.querySelector(`input[type='checkbox']`).checked) {
                        deleteDataLoalStorage()
                        function deleteDataLoalStorage() {
                            obj.splice(index, 1)
                            localStorage.setItem('1', JSON.stringify(obj))
                            // fetchData();
                            checkData();
                        }
                        e.target.parentElement.remove()
                        addMsg.innerHTML = `   <h4>todo delete</h4>`
                        addMsg.classList.add('del-active');
                        setTimeout(() => {
                            addMsg.classList.remove('del-active')
                        }, 2000)
                    }

                })
            } else {
                el.querySelector('p').style = 'text-decoration: none'
            }






        })
    })
}




function update() {
    const updateBtn = document.querySelector('.update-btn')
    const itemList = document.querySelectorAll('.itemList > div > p')
    itemList.forEach((el, index) => {
        console.log(el)
        el.addEventListener('click', (e) => {
            console.log(e.srcElement.parentElement.children[4])
            inputText.value = e.target.innerText
            e.srcElement.parentElement.children[4].addEventListener('click', () => {
                obj.forEach((el, i) => {



                    if (obj[i].name.toLocaleLowerCase() === e.target.innerText.toLocaleLowerCase()) {
                        inputText.value ? updateLocal() : emptyInputAlert();
                        function updateLocal() {
                            obj[i].name = inputText.value;
                            localStorage.setItem('1', JSON.stringify(obj))
                            checkData()
                            inputText.value = null
                        }
                    }

                });
            })


        })

    })


}



