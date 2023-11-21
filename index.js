
const inputText = document.body.children[0].children[1]
const TodoList = document.querySelector('.itemList');
let obj = JSON.parse(localStorage.getItem('1')) || []
var addMsg = document.querySelector('.add');
if (JSON.parse(localStorage.getItem('1'))) fetchData()


function fetchData() {
    TodoList.innerHTML = ''

    JSON.parse(localStorage.getItem('1')).forEach((element, index) => {


        TodoList.innerHTML += `
        <div class='list'> <span class='sr-n' > ${index}</span>
        <input type='checkbox' class='check'> <p>  ${element.name} </p> <button>Delete</button>

        </div>`

    });
    removeItem();
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
    }, 1000)


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
    }, 1000)


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
                            fetchData();
                        }
                        e.target.parentElement.remove()
                        addMsg.innerHTML = `   <h4>todo delete</h4>`
                        addMsg.classList.add('del-active');
                        setTimeout(() => {
                            addMsg.classList.remove('del-active')
                        }, 1000)
                    }

                })
            } else {
                el.querySelector('p').style = 'text-decoration: none'
            }






        })
    })
}





