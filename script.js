const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-label');
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');
// e is the event object.
// When you click on the checkbox, the browser automatically creates an object that contains all information about that click, and it passes it to your function.
// So e = details of the click event.

// checkBoxList.forEach((checkbox) => {
//     checkbox.addEventListener('click',(e) =>{
//         checkbox.parentElement.classList.toggle('completed');
//     })
// })

//every checks weather all elements satisfy the condition
//syntax
// array.every((element, index, array) => {
//     return condition; // true or false
// });

//input.value is the tect we are writing in the box


checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click',(e) =>{
        const allGoalsAdded = [...inputFields].every((input) =>{
            return input.value
        })
        if(allGoalsAdded){
            checkbox.parentElement.classList.toggle('completed');
            progressValue.style.width = '33.33';
        }
        else{
            progressBar.classList.add('show-error');
        }
         
    })
})

//this will handle the case when we had not written any thing till now..so it is showing error..but when we had started to write something then the error will fade off.
inputFields.forEach((input) => {
    input.addEventListener('focus',() => {
        progressBar.classList.remove('show-error');
    })
})