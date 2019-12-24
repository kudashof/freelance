document.addEventListener('DOMContentLoaded', () => {
    'use strict';
/*--------form---------*/
    const customer = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const blockCustomer = document.getElementById('block-customer');
    const blockFreelancer = document.getElementById('block-freelancer');
    const blockChoice = document.getElementById('block-choice');
    const btnExit = document.getElementById('btn-exit');
    const formCustomer = document.getElementById('form-customer');
    const orders = [];


    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
    });
//кн выход
    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockChoice.style.display = 'block';

    });
//перебор эл формы
    formCustomer.addEventListener('submit', (event) =>{
        event.preventDefault();

        /*Вариант с методами filter и forEach*/

        const arr = [...formCustomer.elements];
        const obj = {};
        // for (const elem of formCustomer.elements) {
        //     if ((elem.tagName === 'INPUT' && elem.type!== 'radio') ||
        //         (elem.type === 'radio' && elem.checked)||
        //         elem.tagName === 'TEXTAREA') {
        //         obj[elem.name] = elem.value;
        //
        //         if (elem.type !=='radio') {
        //             elem.value = '';
        //         }
        //     }
        //
        //
        // }

        arr.filter(el =>
            (el.tagName === 'INPUT' && el.type !== 'radio') ||
            (el.type === 'radio' && el.checked) ||
            (el.tagName === 'TEXTAREA'))
            .forEach(el => {
                obj[el.name] = el.value;
            });

        orders.push(obj);

        formCustomer.reset();

    })
});