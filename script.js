// const checkBoxList = document.querySelectorAll('.custom-checkbox');
// const inputFields = document.querySelectorAll('.goal-input');
// const errorLabel = document.querySelector('.error-label');
// const progressBar = document.querySelector('.progress-bar');
// const progressValue = document.querySelector('.progress-value');
// // e is the event object.
// // When you click on the checkbox, the browser automatically creates an object that contains all information about that click, and it passes it to your function.
// // So e = details of the click event.

// // checkBoxList.forEach((checkbox) => {
// //     checkbox.addEventListener('click',(e) =>{
// //         checkbox.parentElement.classList.toggle('completed');
// //     })
// // })

// //every checks weather all elements satisfy the condition
// //syntax
// // array.every((element, index, array) => {
// //     return condition; // true or false
// // });

// //input.value is the tect we are writing in the box


// checkBoxList.forEach((checkbox) => {
//     checkbox.addEventListener('click',(e) =>{
//         const allGoalsAdded = [...inputFields].every((input) =>{
//             return input.value
//         })
//         if(allGoalsAdded){
//             checkbox.parentElement.classList.toggle('completed');
//             progressValue.style.width = '33.33';
//         }
//         else{
//             progressBar.classList.add('show-error');
//         }
         
//     })
// })

// //this will handle the case when we had not written any thing till now..so it is showing error..but when we had started to write something then the error will fade off.
// inputFields.forEach((input) => {
//     input.addEventListener('focus',() => {
//         progressBar.classList.remove('show-error');
//     })
// })



const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')

const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
]

// const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
//   first: {
//     name: '',
//     completed: false,
//   },
//   second: {
//     name: '',
//     completed: false,
//   },
//   third: {
//     name: '',
//     completed: false,
//   },
// }

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length

progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
progressLabel.innerText = allQuotes[completedGoalsCount]

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value
    })

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle('completed')
      const inputId = checkbox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length

      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
      progressLabel.innerText = allQuotes[completedGoalsCount]

      localStorage.setItem('allGoals', JSON.stringify(allGoals))
    } else {
      progressBar.classList.add('show-error')
    }
  })
})

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
  }

  input.addEventListener('focus', () => {
    progressBar.classList.remove('show-error')
  })

  input.addEventListener('input', (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name
      return
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      }
    }

    localStorage.setItem('allGoals', JSON.stringify(allGoals))
  })
})