import {nameInput, jobInput} from './constants.js'

//при открытие popup profile устанавливаем первоначальные значения инпутам
export function setValueInputPopupProfile(data) {
  nameInput.value = data.name;
  jobInput.value = data.job;
}



