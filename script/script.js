document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    /*--------form---------*/
    /*получаем элементы*/
    const customer = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const blockCustomer = document.getElementById('block-customer');
    const blockFreelancer = document.getElementById('block-freelancer');
    const blockChoice = document.getElementById('block-choice');
    const btnExit = document.getElementById('btn-exit');
    const formCustomer = document.getElementById('form-customer');
    const ordersTable = document.getElementById('orders');
    const modalOrder = document.getElementById('orders_read');
    const modalOrderActive = document.getElementById('orders_activ');

    /*создаем заказы*/
    const orders = [];


    //рендерим таблицу заказов
    const renderOrder = () => {

        ordersTable.textContent = '';

        orders.forEach((order, i) =>{
            console.log(order);
            ordersTable.innerHTML += `
            <!--номер заказа-->
            <tr class="order" data-number-order="${i}">  
                <td>${i+1}</td>
                <td>${order.title}</td>
                <td class="${order.currency}"></td>
                <td>${order.deadline}</td>
            </tr>`;
        });


    };

    /*модальное окно*/
    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        const modal = order.active ? modalOrderActive : modalOrder;

        const firstNameBlock = document.querySelector('.firstName');
        const titleBlock = document.querySelector('.modal-title');
        const emailBlock = document.querySelector('.email');
        const discriptionBlock = document.querySelector('.discription');
        const deadlineBlock = document.querySelector('.deadline');
        const currencyBlock = document.querySelector('.currency_img');
        const countBlock = document.querySelector('.count');
        const phoneBlock = document.querySelector('.phone');

        titleBlock.textContent = order.title;
        firstNameBlock.textContent = order.firstName;

    modal.style.display = 'block';

    }

    /*обработчик событий таблицы*/
    ordersTable.addEventListener('click', (event) => {
        //на что кликнул то и получил в верстке
        const target = event.target;
        //получаю всю строку заказа
        const targetOrder = target.closest('.order');

        if (targetOrder) {
            openModal();
        }

        //получает data атрибут
        console.log(orders[targetOrder.dataset.numberOrder]);
    });

    /*обработчик событий кн Заказчик*/
    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    /*обработчик событий кн Фрилансер*/
    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        renderOrder();
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    /*обработчик событий кн Выход*/
    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockChoice.style.display = 'block';

    });

    /*Перебор эл формы, отправка заказа*/
    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();

        /*Вариант с методами filter и forEach*/

        const obj = {};

        const elements = [...formCustomer.elements]
            .filter((elem) =>
                (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) ||
                elem.tagName === 'TEXTAREA');

        elements.forEach((elem) => {
            obj[elem.name] = elem.value;

            if (elem.type !== 'radio') {
                elem.value = '';
            }
        });
        /*добавляем форму в заказы*/
        orders.push(obj);
        /*сброс формы*/
        formCustomer.reset();
    })


});